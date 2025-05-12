
export type User = {
  id: string;
  email: string;
  drive_folder_id?: string;
  created_at: string;
};

export type Project = {
  id: string;
  title: string;
  script: string;
  style: 'Minimalista' | 'Quadrinhos';
  status: 'Pendente' | 'Em Progresso' | 'Concluído';
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  url: string;
  drive_url: string;
  scene_number: number;
  created_at: string;
};

export type ProjectFormData = {
  title: string;
  script: string;
  style: 'Minimalista' | 'Quadrinhos';
};
