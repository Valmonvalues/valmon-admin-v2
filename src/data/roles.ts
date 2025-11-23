export const roles = [
  {
    name: 'super_admin',
    label: 'Super Admin',
    permissions: [],
  },
  {
    name: 'admin',
    label: 'COO (Chief Operating Officer)',
    permissions: [],
  },
  {
    name: 'moderator',
    label: 'Moderator',
    permissions: [],
  },
  //   {
  //     name: 'moderator',
  //     label: 'CTO (Chief Technology Officer)',
  //     permissions: [],
  //   },
  //   {
  //     name: 'moderator',
  //     label: 'CMO (Chief Marketing Officer)',
  //     permissions: [],
  //   },
  //   {
  //     name: 'moderator',
  //     label: 'CSR (Customer Support Representative)',
  //     permissions: [],
  //   },
]

export const allowedRoles = {
  summary: ['all'],
  users: ['super_admin', 'admin'],
  skills: ['super_admin', 'admin'],
  marketPlace: ['super_admin', 'admin'],
  wallet: ['super_admin', 'admin'],
  resolution: ['super_admin', 'admin'],
  categoryRequest: ['super_admin', 'admin'],
  settings: ['all'],
  account: ['super_admin'],
}
