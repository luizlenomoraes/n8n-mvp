
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          drive_folder_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          drive_folder_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          drive_folder_id?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: string
          title: string
          script: string
          style: "Minimalista" | "Quadrinhos"
          status: "Pendente" | "Em Progresso" | "Concluído"
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          script: string
          style: "Minimalista" | "Quadrinhos"
          status?: "Pendente" | "Em Progresso" | "Concluído"
          user_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          script?: string
          style?: "Minimalista" | "Quadrinhos"
          status?: "Pendente" | "Em Progresso" | "Concluído"
          user_id?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          url: string
          drive_url: string
          scene_number: number
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          url: string
          drive_url: string
          scene_number: number
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          url?: string
          drive_url?: string
          scene_number?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
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
  }
}
