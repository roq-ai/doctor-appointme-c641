interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['System Administrator'],
  customerRoles: ['Customer'],
  tenantRoles: ['System Administrator', 'Healthcare Provider', 'Medical Staff', 'Patient', 'Insurance Provider'],
  tenantName: 'Clinic',
  applicationName: 'Doctor Appointment System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read appointment details',
    'Create new appointments',
    'Edit personal information',
    'Read clinic information',
  ],
  ownerAbilities: [
    'Manage user data',
    'Manage clinic data',
    'Manage appointment data',
    'Manage healthcare provider data',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/16cfbf06-2ab1-4a00-89ad-ae3147fed7aa',
};
