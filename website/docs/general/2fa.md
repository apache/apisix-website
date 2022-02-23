---
id: 2fa
title: Two Factor Authentication
keywords:
- API gateway
- APISIX
- Apache APISIX
- Two Factor Authentication
description: This article provides information on how to enable Two-Factor Authentication (2FA) on GitHub. It consists of 3 parts, what is Two-Factor Authentication (2FA), how to enable 2FA on GitHub, and how to submit code.
---

## Two-Factor Authentication (2FA)

Two-Factor Authentication (2FA) refers to the authentication method that combines both a password and an object (credit card, SMS, tokens, or biomarkers as fingerprint) to identify a user.

To ensure the security of the committer’s account, we need you to [configure 2FA](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) while signing in to contribute code on GitHub. For more details, please refer to [Securing your account with two-factor authentication (2FA)](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa).

**Note**: If 2FA is not enabled, you are liable to be removed from the project and would not be able to access Apache APISIX's repositories.

## Configuring 2FA on GitHub

You can configure 2FA using a [mobile app](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-a-totp-mobile-app) or via [text message](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication#configuring-two-factor-authentication-using-text-messages).

GitHub recommends using a time-based-one-time password (TOTP) mobile application to configure 2FA. Read [Configuring two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) for detailed information.

## Submitting Code

After enabling 2FA, [create a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) to perform Git operations.

You can then use the username + personal access token combination in place of the username + password combination while pushing your code.
