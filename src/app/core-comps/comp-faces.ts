export enum CompFaces {
    LANDING = 'landing' as any,
    HOME = 'home' as any,
    ABOUT = 'about' as any,
    SERVICES = 'services' as any,
    CONTACT = 'contact' as any,
}

export interface MainRoutesInterface {
  title?: string;
  redirectTo?: string;
  loadChildren?: any;
  loadComponent?: any;
  pathMatch?: any;
  path: string;
  component?: any;
  data?: {
      state: string;
      animation: string;
      mobile?: any;
  };
  children?: any;
  outlets?: any;
  outlet?: string;
  formType?: CompFaces;
}
