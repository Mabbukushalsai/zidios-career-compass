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
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          resume_url: string | null
          status: string
          student_id: string
          updated_at: string | null
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          resume_url?: string | null
          status?: string
          student_id: string
          updated_at?: string | null
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          resume_url?: string | null
          status?: string
          student_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          company_size: string | null
          description: string | null
          id: string
          industry: string | null
          logo_url: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_size?: string | null
          description?: string | null
          id: string
          industry?: string | null
          logo_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_size?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_id: string
          id: string
          progress: number | null
          started_at: string | null
          student_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_id: string
          id?: string
          progress?: number | null
          started_at?: string | null
          student_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string
          id?: string
          progress?: number | null
          started_at?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          content_url: string | null
          created_at: string | null
          description: string
          duration: string | null
          id: string
          instructor: string
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          content_url?: string | null
          created_at?: string | null
          description: string
          duration?: string | null
          id?: string
          instructor: string
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          content_url?: string | null
          created_at?: string | null
          description?: string
          duration?: string | null
          id?: string
          instructor?: string
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          description: string
          end_date: string
          event_type: string
          id: string
          image_url: string | null
          location: string | null
          organizer: string | null
          start_date: string
          title: string
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          end_date: string
          event_type: string
          id?: string
          image_url?: string | null
          location?: string | null
          organizer?: string | null
          start_date: string
          title: string
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          end_date?: string
          event_type?: string
          id?: string
          image_url?: string | null
          location?: string | null
          organizer?: string | null
          start_date?: string
          title?: string
          website_url?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company_id: string
          created_at: string | null
          description: string
          id: string
          job_type: string | null
          location: string | null
          salary_range: string | null
          skills_required: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          description: string
          id?: string
          job_type?: string | null
          location?: string | null
          salary_range?: string | null
          skills_required?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          description?: string
          id?: string
          job_type?: string | null
          location?: string | null
          salary_range?: string | null
          skills_required?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_test_questions: {
        Row: {
          correct_answer: string
          id: string
          options: Json
          points: number | null
          question: string
          test_id: string
        }
        Insert: {
          correct_answer: string
          id?: string
          options: Json
          points?: number | null
          question: string
          test_id: string
        }
        Update: {
          correct_answer?: string
          id?: string
          options?: Json
          points?: number | null
          question?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mock_test_questions_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      mock_tests: {
        Row: {
          created_at: string | null
          description: string
          duration: number
          id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          duration: number
          id?: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          duration?: number
          id?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          id: string
          location: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          id: string
          location?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      student_profiles: {
        Row: {
          education: string | null
          graduation_year: number | null
          id: string
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          education?: string | null
          graduation_year?: number | null
          id: string
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          education?: string | null
          graduation_year?: number | null
          id?: string
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_materials: {
        Row: {
          content_url: string
          created_at: string | null
          description: string
          id: string
          material_type: string
          thumbnail_url: string | null
          title: string
        }
        Insert: {
          content_url: string
          created_at?: string | null
          description: string
          id?: string
          material_type: string
          thumbnail_url?: string | null
          title: string
        }
        Update: {
          content_url?: string
          created_at?: string | null
          description?: string
          id?: string
          material_type?: string
          thumbnail_url?: string | null
          title?: string
        }
        Relationships: []
      }
      test_attempts: {
        Row: {
          answers: Json | null
          completed_at: string | null
          id: string
          score: number | null
          started_at: string | null
          student_id: string
          test_id: string
        }
        Insert: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          student_id: string
          test_id: string
        }
        Update: {
          answers?: Json | null
          completed_at?: string | null
          id?: string
          score?: number | null
          started_at?: string | null
          student_id?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_attempts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_attempts_test_id_fkey"
            columns: ["test_id"]
            isOneToOne: false
            referencedRelation: "mock_tests"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          approved: boolean | null
          created_at: string | null
          email: string
          id: string
          name: string
          role: string
        }
        Insert: {
          approved?: boolean | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          role: string
        }
        Update: {
          approved?: boolean | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
