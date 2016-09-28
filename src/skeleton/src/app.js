export class App {
  configureRouter(config, router) {
    config.title = 'Chrysalis - Mark 1';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true,  title: 'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'users',        nav: true,  title: 'Github Users' },
      { route: 'users/create',  name: 'users-create', moduleId: 'users-create', nav: false, title: 'Create User' },
      { route: 'users/:id/detail', name: 'users-detail', moduleId: 'users-detail', nav: false },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true,  title: 'Child Router' },
      { route: 'roles',         name: 'roles',        moduleId: 'roles/role-home',   nav: true,  title: 'Role Manager' }
]);

    this.router = router;
  }
}
