export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      usage_restriction: {
        Row: {
          count: number;
          created_at: string;
          id: number;
          identifier: string;
        };
        Insert: {
          count: number;
          created_at: string;
          id?: number;
          identifier: string;
        };
        Update: {
          count?: number;
          created_at?: string;
          id?: number;
          identifier?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Usage = Tables<'usage_restriction'>;
