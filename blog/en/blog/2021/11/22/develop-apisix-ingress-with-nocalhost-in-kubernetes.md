---
title: "Develop APISIX Ingress Controller with Nocalhost in K8s"
author: "Garry Chen"
authorURL: "https://github.com/neaped"
authorImageURL: "https://avatars.githubusercontent.com/u/3713305?v=4"
keywords: 
- Kubernetes
- API Gateway
- Apache APISIX Ingress
- Nocalhost
- Controller
- Development
description: This article introduces the use of Nocalhost to seamlessly connect a local development machine to a remote K8s and develop and debug APISIX Ingress Controller with IDE.
tags: [Ecosystem]
---

> This article walks you through using Nocalhost to seamlessly connect your local development machine to a remote Kubernetes cluster, allowing you to use IDE to develop and debug Apache APISIX Ingress Controller. Giving you the ability to comfortably develop and debug your remote apps with your existing skills.

<!--truncate-->

## Prerequisites

- Prepare an available Kubernetes cluster in your workstation. You can use any Kubernetes clusters that you have namespace admin privilege.
- [Helm v3.0+](https://helm.sh) installed
- GoLand IDE 2020.03+ (Use GoLand 2021.2 in this article)
- [Install Nocalhost JetBrains plugin](https://nocalhost.dev/docs/installation#install-jetbrains-plugin)
- Install [Go 1.13](https://golang.org/dl/) or later

## Deploy Apache APISIX Ingress Controller

I'm going to deploy Apache APISIX Ingress Controller by Nocalhost within GoLand:

1. Open the Nocalhost plugin within GoLand
2. Use the cluster inspector to select the namespace that you want to deploy.
3. Right-click the selected namespace, choose **`Deploy Application`**, and select **`Helm Repo`** as installation method.
4. In the following dialog box, input:

    1. `apisix-ingress-controller` as `Name`
    2. `https://charts.apiseven.com` as `Chart URL`

![Deploy APISIX ingress controller](https://static.apiseven.com/202108/1637131316244-f1a58c88-8628-4918-a4c4-1ad287742fd0.gif)

Let's test the `apisix-ingress-controller` after deployment by enable the port-forwarding within IDE:

1. Find the `apisix-ingress-controller` workload in the cluster inspector, right-click and select the **`Port Forward`**
2. Add the port-forwarding `8080:8080`
3. Visiting the [`http://127.0.0.1:8080/healthz`](http://127.0.0.1:8080/healthz) in local and check the result

![APISIX Ingress test](https://static.apiseven.com/202108/1637131450462-842c3baf-b7a4-4598-be0b-27486bf1cf28.gif)

## Developing

### Step 1: Start DevMode

1. Right-click the deployment `apisix-ingress-controller` in cluster inspector, select **`Start DevMode`**
2. Choose your source code directory if you have already cloned in local, or let Nocalhost clone the source code for you by entering the **apache/apisix-ingress-controller** [repository URL](https://github.com/apache/apisix-ingress-controller.git)
3. Wait for the operations, Nocalhost will open the remote terminal within IDE after entering DevMode

Now start the `apisix-ingress-controller` process by entering the following command in the remote terminal:

```bash
go run main.go ingress --config-path conf/config-default.yaml
```

After the `apisix-ingress-controller` has started, access the service by visiting [`http://127.0.0.1:8080/healthz`](http://127.0.0.1:8080/healthz) on local and check the result.

![Enter DevMode](https://static.apiseven.com/202108/1637131513751-b9184c10-4da3-4ab2-b403-56ae2360704a.gif)

### Step 2: Change code and check result

Now I will make some code changes and check the result.

1. Stop the `apisix-ingress-controller` process
2. Search `healthz` and find the `router.go` file. Change the `healthzResponse` status code from `ok` to `Hello Nocalhost`
3. Start the process again and check the change result in local

![Code change](https://static.apiseven.com/202108/1637131699629-a0766f66-0faa-4bf8-9013-284e5f2bdd57.gif)

### Step 3. End DevMode

Now close the development window and end DevMode.

1. Right-click the `apisix-ingress-controller` in the cluster inspector
2. Select **`End DevMode`**

Nocalhost will make `apisix-ingress-controller` end development mode, and reset the `apisix-ingress-controller` Pod to its original version. Enable the port-forwarding and check the result after ending DevMode.

![End DevMode](https://static.apiseven.com/202108/1637131766524-dba7b756-ae0b-42d1-8ff0-6ac14059ce11.gif)

**Code Change**: All code changes in development mode will **only take effect** in the development container.

After exiting the development mode, Nocalhost will reset the remote container to its original state (before the code is modified). In this way, after exiting the development mode, the modification of the code will **not** cause any changes or impact on the original environment.

## Debugging

Debugging an application is not easy, and debugging an application in the Kubernetes cluster is even more difficult. Nocalhost is here to help by providing the same debugging experience you're used in the IDE when debugging in the remote Kubernetes cluster.

### Step 1: Start remote debugging

We can start remote debugging by:

1. Right-click `apisix-ingress-controller` and choose **`Remote Debug`**
2. Nocalhost will put `apisix-ingress-controller` into DevMode and run debug command defined in [`dev config`](https://nocalhost.dev/zh-CN/docs/config/config-develop) automatically

![Start remote debugging](https://static.apiseven.com/202108/1637132327260-7bba1d81-cf70-4982-9a07-51cc379e6bea.gif)

### Step 2: Step through breakpoints

Now set a breakpoint on the `healthz` function. Hover over just to the left of the line number and click on the red dot. Once it’s set, visit [`http://127.0.0.1:8080/healthz`](http://127.0.0.1:8080/healthz) in your local browser, GoLand should pop to the foreground. Click the play button to close the request and the progress should continue loading.

In addition, as I enable the `dev.hotReload`, so every time you make the code change, Nocalhost will automatically re-run the debug command. This is very useful when you make the code change and debug frequently.

![Setting up breakpoints and run service](https://static.apiseven.com/202108/1637132455552-86f44c0c-94d1-4ad9-a79d-0e2c6957d60b.gif)

## Remote Run

Not just remote debugging, Nocalhost also provides an easy way to run your Go service in the Kubernetes cluster, plus hot reload!

You can using the remote run feature by:

1. Right-click `apisix-ingress-controller` in cluster inspector, choose **`Remote Run`**
2. Nocalhost will put `apisix-ingress-controller` into development mode and and run start command defined in [`dev config`](https://nocalhost.dev/zh-CN/docs/config/config-develop) automatically

Now every time you make code changes, Nocalhost will automatically trigger the run command. You can now enjoy the hot reload for Go without complex configuration.

![Remote run](https://static.apiseven.com/202108/1637133046432-84810667-c3ee-4d71-8a33-eb1833fd9ce2.gif)

## Conclusion

We’ve learned how to use Nocalhost to develop and debug the APISIX Ingress Controller in Kubernetes. Now, instead of waiting for slow local development processes, we can iterate quickly with an instant feedback loop and a productive cloud-native development environment.
