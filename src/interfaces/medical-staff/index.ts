import { ClinicInterface } from 'interfaces/clinic';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MedicalStaffInterface {
  id?: string;
  staff_name: string;
  staff_position: string;
  contact_number: string;
  email: string;
  clinic_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  clinic?: ClinicInterface;
  user?: UserInterface;
  _count?: {};
}

export interface MedicalStaffGetQueryInterface extends GetQueryInterface {
  id?: string;
  staff_name?: string;
  staff_position?: string;
  contact_number?: string;
  email?: string;
  clinic_id?: string;
  user_id?: string;
}
