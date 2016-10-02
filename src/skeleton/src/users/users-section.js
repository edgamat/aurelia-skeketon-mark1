
export class UsersSection {

    configureRouter(config, router) {
        config.map([       
          { route: ['', 'users-home'], name: 'users-home', moduleId: './users-home', nav: false, title: 'User Manager' },  
          { route: 'users/:id/detail', name: 'users-detail', moduleId: 'users-detail', nav: false },
        ]);

        this.router = router;

    }
}
