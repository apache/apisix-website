import { SKIP, visit } from 'unist-util-visit';

const ATTRIBUTE_COLUMN_KINDS = [
  ['name', /^(name|field|名称|字段|参数名|属性名称)$/i],
  ['type', /^(type|类型)$/i],
  ['required', /^(required|requirement|必选项|必填|必需|是否必需|要求)$/i],
  ['encrypted', /^(encrypted|加密)$/i],
  ['default', /^(default( value)?|默认值|默认)$/i],
  ['valid-values', /^(valid( values?)?|有效值|有效)$/i],
  ['description', /^(description|描述)$/i],
];

const FIELD_TYPE_PATTERN = /^(?:array|boolean|integer|null|number|object|string)(?:\s*[/|]\s*(?:array|boolean|integer|null|number|object|string))*$/i;

function textContent(node) {
  if (typeof node.value === 'string') return node.value;
  return node.children?.map(textContent).join('') ?? '';
}

function classNames(value) {
  if (Array.isArray(value)) return value;
  return typeof value === 'string' ? [value] : [];
}

// Header semantics are deliberate: request, metadata, and other field-schema
// tables need the same readable widths even when the section is not literally
// titled "Attributes".
function attributeColumns(node) {
  const headerRow = node.children
    ?.find((child) => child.tagName === 'thead')
    ?.children?.find((child) => child.tagName === 'tr');
  const headers = headerRow?.children
    ?.filter((child) => child.tagName === 'th')
    .map((child) => textContent(child).trim().replace(/\s+/g, ' ')) ?? [];
  const columns = headers.map((header) => (
    ATTRIBUTE_COLUMN_KINDS.find(([, pattern]) => pattern.test(header))?.[0]
  ));

  if (columns.length < 3 || columns.length > 7) return null;
  if (columns[0] !== 'name' || columns.at(-1) !== 'description') return null;
  if (columns.some((column) => !column)) return null;
  if (new Set(columns).size !== columns.length) return null;
  if (!columns.includes('type') && !columns.includes('required')) return null;
  // Name | Type | Description is also used by metric catalogs. Only promote
  // the ambiguous three-column form when its body contains field data types.
  if (
    columns.length === 3
    && columns[1] === 'type'
    && !hasFieldTypeValues(node)
  ) return null;

  return columns;
}

function decorateRow(row, columns) {
  let columnIndex = 0;

  return {
    ...row,
    children: row.children?.map((cell) => {
      if (cell.tagName !== 'th' && cell.tagName !== 'td') return cell;

      const column = columns[columnIndex];
      columnIndex += 1;
      if (!column) return cell;

      return {
        ...cell,
        properties: {
          ...cell.properties,
          className: [
            ...classNames(cell.properties?.className),
            `docs-table__col--${column}`,
          ],
        },
      };
    }),
  };
}

function decorateAttributeColumns(node, columns) {
  return {
    ...node,
    children: node.children?.map((section) => {
      if (!['thead', 'tbody', 'tfoot'].includes(section.tagName)) return section;

      return {
        ...section,
        children: section.children?.map((row) => (
          row.tagName === 'tr' ? decorateRow(row, columns) : row
        )),
      };
    }),
  };
}

function hasFieldTypeValues(node) {
  const bodyRows = node.children
    ?.find((child) => child.tagName === 'tbody')
    ?.children?.filter((child) => child.tagName === 'tr') ?? [];
  const typeValues = bodyRows.map((row) => {
    const cells = row.children?.filter((child) => (
      child.tagName === 'th' || child.tagName === 'td'
    )) ?? [];
    return cells[1]
      ? textContent(cells[1]).trim().replace(/[\s\u00a0]+/g, ' ')
      : '';
  });

  return bodyRows.length > 0
    && typeValues.every((value) => FIELD_TYPE_PATTERN.test(value));
}

export default function rehypeDocTables() {
  return (tree, file) => {
    if (!String(file.path ?? '').includes('/docs-')) return;

    let sectionLabel = 'Documentation';

    visit(tree, 'element', (node, index, parent) => {
      if (/^h[1-6]$/.test(node.tagName)) {
        sectionLabel = textContent(node).trim() || sectionLabel;
        return;
      }

      if (node.tagName !== 'table' || !parent || typeof index !== 'number') return;

      const classes = classNames(node.properties?.className);
      const columns = attributeColumns(node);
      const attributesTable = columns !== null;
      const decoratedNode = attributesTable
        ? decorateAttributeColumns(node, columns)
        : node;
      const table = {
        ...decoratedNode,
        properties: {
          ...decoratedNode.properties,
          className: [
            ...classes,
            'docs-table',
            ...(attributesTable ? ['docs-table--attributes'] : []),
          ],
        },
      };

      const shell = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['table-shell', ...(attributesTable ? ['table-shell--attributes'] : [])],
          'data-overflow': 'unknown',
          'data-at-start': 'true',
          'data-at-end': 'false',
          'data-table-label': sectionLabel,
        },
        children: [{
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['table-scroll'],
            role: 'region',
            tabIndex: 0,
            ariaLabel: sectionLabel,
          },
          children: [table],
        }],
      };
      parent.children.splice(index, 1, shell);

      return SKIP;
    });
  };
}
