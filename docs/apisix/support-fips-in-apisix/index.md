# Support FIPS in APISIX

> Compile apisix-runtime with OpenSSL 3.0 (FIPS enabled)

Source: https://apisix.apache.org/docs/apisix/support-fips-in-apisix/

OpenSSL 3.0 [supports](https://www.openssl.org/blog/blog/2022/08/24/FIPS-validation-certificate-issued/) [FIPS](https://en.wikipedia.org/wiki/FIPS_140-2) mode. To support FIPS in APISIX, you can compile apisix-runtime with OpenSSL 3.0.

## Compilation

To compile apisix-runtime with OpenSSL 3.0, run the commands below as root user:

```bash
cd $(mktemp -d)
OPENSSL3_PREFIX=${OPENSSL3_PREFIX-/usr/local}
apt install -y build-essential
git clone https://github.com/openssl/openssl
cd openssl
./Configure --prefix=$OPENSSL3_PREFIX/openssl-3.0 enable-fips
make install
echo $OPENSSL3_PREFIX/openssl-3.0/lib64 > /etc/ld.so.conf.d/openssl3.conf
ldconfig
$OPENSSL3_PREFIX/openssl-3.0/bin/openssl fipsinstall -out $OPENSSL3_PREFIX/openssl-3.0/ssl/fipsmodule.cnf -module $OPENSSL3_PREFIX/openssl-3.0/lib64/ossl-modules/fips.so
sed -i 's@# .include fipsmodule.cnf@.include '"$OPENSSL3_PREFIX"'/openssl-3.0/ssl/fipsmodule.cnf@g; s/# \(fips = fips_sect\)/\1\nbase = base_sect\n\n[base_sect]\nactivate=1\n/g' $OPENSSL3_PREFIX/openssl-3.0/ssl/openssl.cnf
cd ..

export cc_opt="-I$OPENSSL3_PREFIX/openssl-3.0/include"
export ld_opt="-L$OPENSSL3_PREFIX/openssl-3.0/lib64 -Wl,-rpath,$OPENSSL3_PREFIX/openssl-3.0/lib64"

wget --no-check-certificate https://raw.githubusercontent.com/api7/apisix-build-tools/master/build-apisix-runtime.sh
chmod +x build-apisix-runtime.sh
./build-apisix-runtime.sh
```

This will install apisix-runtime to `/usr/local/openresty`.
