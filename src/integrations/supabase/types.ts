export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_conversations: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      community_submissions: {
        Row: {
          created_at: string
          description: string | null
          image_url: string
          item_name: string
          plastic_type_suggested: string | null
          user_classification: string | null
          user_id: string
          verified: boolean | null
          verified_by: string | null
          votes_helpful: number | null
          votes_not_helpful: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          image_url: string
          item_name: string
          plastic_type_suggested?: string | null
          user_classification?: string | null
          user_id: string
          verified?: boolean | null
          verified_by?: string | null
          votes_helpful?: number | null
          votes_not_helpful?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          image_url?: string
          item_name?: string
          plastic_type_suggested?: string | null
          user_classification?: string | null
          user_id?: string
          verified?: boolean | null
          verified_by?: string | null
          votes_helpful?: number | null
          votes_not_helpful?: number | null
        }
        Relationships: []
      }
      educational_content: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          likes: number | null
          published: boolean | null
          title: string
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number | null
          published?: boolean | null
          title: string
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          likes?: number | null
          published?: boolean | null
          title?: string
          views?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plastic_types: {
        Row: {
          co2_impact_per_kg: number | null
          common_uses: string[] | null
          created_at: string
          description: string | null
          environmental_impact: string | null
          id: string
          name: string
          plastic_code: string
          recyclable: boolean | null
          recycling_difficulty: string | null
          recycling_instructions: string | null
        }
        Insert: {
          co2_impact_per_kg?: number | null
          common_uses?: string[] | null
          created_at?: string
          description?: string | null
          environmental_impact?: string | null
          id?: string
          name: string
          plastic_code: string
          recyclable?: boolean | null
          recycling_difficulty?: string | null
          recycling_instructions?: string | null
        }
        Update: {
          co2_impact_per_kg?: number | null
          common_uses?: string[] | null
          created_at?: string
          description?: string | null
          environmental_impact?: string | null
          id?: string
          name?: string
          plastic_code?: string
          recyclable?: boolean | null
          recycling_difficulty?: string | null
          recycling_instructions?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          co2_saved: number | null
          created_at: string
          eco_points: number | null
          email: string | null
          full_name: string | null
          id: string
          items_recycled: number | null
          location: string | null
          total_scans: number | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          co2_saved?: number | null
          created_at?: string
          eco_points?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          items_recycled?: number | null
          location?: string | null
          total_scans?: number | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          co2_saved?: number | null
          created_at?: string
          eco_points?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          items_recycled?: number | null
          location?: string | null
          total_scans?: number | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      recycling_centers: {
        Row: {
          accepted_materials: string[] | null
          address: string
          created_at: string
          hours_of_operation: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          special_instructions: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          accepted_materials?: string[] | null
          address: string
          created_at?: string
          hours_of_operation?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          special_instructions?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          accepted_materials?: string[] | null
          address?: string
          created_at?: string
          hours_of_operation?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          special_instructions?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      scan_history: {
        Row: {
          confidence_score: number | null
          created_at: string
          detected_items: Json | null
          disposal_method: string | null
          eco_points_earned: number | null
          id: string
          image_url: string
          location_scanned: string | null
          plastic_type_id: string | null
          recyclable: boolean | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          detected_items?: Json | null
          disposal_method?: string | null
          eco_points_earned?: number | null
          id?: string
          image_url: string
          location_scanned?: string | null
          plastic_type_id?: string | null
          recyclable?: boolean | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          detected_items?: Json | null
          disposal_method?: string | null
          eco_points_earned?: number | null
          id?: string
          image_url?: string
          location_scanned?: string | null
          plastic_type_id?: string | null
          recyclable?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_history_plastic_type_id_fkey"
            columns: ["plastic_type_id"]
            isOneToOne: false
            referencedRelation: "plastic_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_user_stats: {
        Args: { p_user_id: string; p_eco_points: number; p_co2_saved: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
