# Architecture decisions

- Tenant typography is stored as allowlisted font keys in `organization_branding`; this keeps white-label identity data-driven without allowing arbitrary remote CSS.
- A real custom hostname has priority over local demo overrides; this prevents a stale browser override from leaking another tenant onto a client domain.
- Tenant branding powers both Academy and `/empresa`, while `/admin` remains platform-branded; this preserves white-label ownership without leaking tenant identity into global administration.