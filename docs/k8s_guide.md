# Deploying Nametag to Kubernetes

You have chosen to make your image **public**, which simplifies deployment by removing the need for authentication secrets.

## 1. Make the Image Public (GitHub UI)

This step must be done in the browser.

1.  Go to your GitHub Profile > **Packages**.
2.  Click on the `nametag` package.
3.  Click **Package settings** (sidebar).
4.  Scroll to **"Danger Zone"** > **"Change visibility"**.
5.  Select **Public** and confirm.

## 2. Deployment Manifest (nametag.yaml)

Save this as `nametag.yaml` and apply it with `kubectl apply -f nametag.yaml`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nametag
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nametag
  template:
    metadata:
      labels:
        app: nametag
    spec:
      # No imagePullSecrets needed for public images
      containers:
        - name: nametag
          # Replace <YOUR_USERNAME> and <TAG> (e.g., master, or the commit SHA)
          image: ghcr.io/<YOUR_GITHUB_USERNAME>/nametag:<TAG>
          ports:
            - containerPort: 3000
          env:
            # Required Environment Variables
            - name: DATABASE_URL
              value: "postgresql://user:password@postgres-service:5432/nametag" # Update to your DB
            - name: NEXTAUTH_SECRET
              value: "changeme_min_32_chars_random_string_here"
            - name: NEXTAUTH_URL
              value: "http://nametag.local" # Update to your ingress URL
            # OIDC Configuration
            - name: OIDC_CLIENT_ID
              value: "your-client-id"
            - name: OIDC_CLIENT_SECRET
              value: "your-client-secret"
            - name: OIDC_ISSUER
              value: "https://auth.example.com/application/o/nametag/"
---
apiVersion: v1
kind: Service
metadata:
  name: nametag
spec:
  selector:
    app: nametag
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```
