export type AddEventResult = 
  | { success: true; data: any }
  | { success: false; error: { code: number; message: string } };
