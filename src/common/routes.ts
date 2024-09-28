export const appRoutes = {
  home: '/',
  redirect: '/redirect',
  auth: '/Auth',
  admin: {
    profile: '/admin',
    staff: '/admin/all-staff',
    positions: '/admin/positions',
    staffInfo: '/admin/all-staff/profile',
    stats: '/admin/stats',
  },
  user: {
    profile: '/profile',
    account: '/profile/info',
    dashboard: '/profile/dashboard',
    calendar: '/profile/calendar',
    desk: '/profile/notes/',
    teams: '/profile/teams/all/',
    projects: '/profile/projects/all/',
  },
  notFound: '*',
};

export const authUrl = {
  register: 'Auth/register',
  login: 'Auth/login',
  logout: 'Auth/logout',
  googleLogin: 'Auth/google',
};

export const userUrl = {
  get: 'user',
  getOne: 'user/info/',
  update: 'user/edit/',
  delete: 'user/delete/',
  updatePhoto: 'user/photo/edit/',
};

export const positionUrl = {
  get: 'positions',
  create: 'positions/new-position',
  getOne: 'positions/info/',
  update: 'positions/edit/',
  delete: 'positions/delete',
};

export const teamUrl = {
  get: 'teams',
  create: 'teams/new-team',
  toggle: 'teams/toggle-favourite/',
  deleteMember: 'teams/delete-members/',
  deleteTeam: 'teams/delete-team/',
  update: 'teams/update-members/',
};

export const projectUrl = {
  get: 'projects',
  create: 'projects/new-project/',
  toggleFavourite: 'projects/toggle-favourite/',
  toggleIsDone: 'projects/toggle-status',
  update: 'projects/update/',
  delete: 'projects/delete/',
};

export const taskUrl = {
  addTask: projectUrl.get + '/add-tasks/',
};
