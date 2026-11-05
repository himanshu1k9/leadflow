export interface Lead {
  id: number;
  name: string;
  email: string;
  status: "new" | "converted" | "pending";
}

export interface LeadApiResponse {
  success: boolean;
  message: string;
  data: Lead[];
}
