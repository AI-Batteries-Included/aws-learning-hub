# Infographics Directory

This directory contains header infographics for AWS component pages.

## Image Specifications
- **Recommended Size**: 1200x600px (2:1 aspect ratio)
- **Formats**: PNG for photos, SVG for diagrams (recommended for scalability)
- **File Size**: <500KB recommended for optimal performance
- **Naming**: Use descriptive names matching the component (e.g., `s3-architecture.png`)

## Component Pages with Infographics

### Foundation Pages
- `aws-basics.svg` - AWS Fundamentals
- `environment-setup.svg` - Development Environment Setup
- `architecture-overview.svg` - AWS Architecture Overview
- `github-fundamentals.svg` - GitHub Fundamentals
- `vscode-setup.svg` - VS Code Setup
- `claude-code-setup.svg` - Claude Code Setup

### Core Components
- `s3-clean.svg` - Amazon S3 Storage (working example)
- `lambda-functions.svg` - AWS Lambda Functions  
- `cloudfront.svg` - Amazon CloudFront CDN
- `route53.svg` - Amazon Route 53 DNS
- `iam-permissions.svg` - AWS IAM Permissions
- `ses-email.svg` - Amazon SES Email Service
- `cloudformation.svg` - AWS CloudFormation

## Usage
Place your infographic files in this directory and reference them in the respective component page with the `infographicPath` prop:

```typescript
infographicPath="/images/infographics/s3.png"
```