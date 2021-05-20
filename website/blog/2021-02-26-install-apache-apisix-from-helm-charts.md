---
title: "Install Apache APISIX from Helm Charts"
author: Chao Zhang
authorURL: "https://github.com/tokers"
authorImageURL: "https://avatars.githubusercontent.com/u/10428333?s=400&u=f48ef50c5621a1616a3ede50221547e34270e061&v=4"
---

> [@tokers](https://github.com/tokers), Apache APISIX Committer from [Shenzhen Zhiliu Technology Co.](https://www.apiseven.com/)
>

<!--truncate-->

> Source:
>
> - https://github.com/apache/apisix
> - https://github.com/apache/apisix-helm-chart

A few days ago, [Zhiliu Inc](https://www.apiseven.com/) released an online Helm Charts repository. Users can easily install Apache APISIX, Apache apisix-dashboard and Apache apisix-ingress-controller from it (rather than cloning the corresponding project in advance).

## How To Use

Just a few steps to install Apache APISIX

1. Add the repository and fetch the update

   ```
   $ helm repo add apisix https://charts.apiseven.com
   $ helm repo update
   ```

2. Check out the available charts in repository

   ```
   $ helm search repo apisix

   NAME                    CHART VERSION   APP VERSION     DESCRIPTION
   apisix/apisix           0.1.2           2.1.0           A Helm chart for Apache APISIX
   apisix/apisix-dashboard 0.1.0           2.3.0           A Helm chart for Apache APISIX Dashboard
   ```

3. Install Apache APISIX to your Kubernetes cluster

   ```
   $ helm install apisix-gw apisix/apisix --namespace default

   NAME: apisix-gw
   LAST DEPLOYED: Fri Feb 19 11:34:14 2021
   NAMESPACE: default
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   1. Get the application URL by running these commands:
     export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services apisix-gw-gateway)
     export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
     echo http://$NODE_IP:$NODE_PORT
   ```

## See Also

- https://github.com/apache/apisix-helm-chart
