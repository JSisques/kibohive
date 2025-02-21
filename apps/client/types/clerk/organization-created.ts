export interface ClerkOrganizationCreated {
  data: {
    created_at: number;
    created_by: string;
    id: string;
    image_url: string;
    logo_url: string;
    name: string;
    object: string;
    public_metadata: Record<string, unknown>;
    slug: string;
    updated_at: number;
  };
  event_attributes: {
    http_request: {
      client_ip: string;
      user_agent: string;
    };
  };
  object: string;
  timestamp: number;
  type: string;
}
