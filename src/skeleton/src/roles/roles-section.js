
export class RolesSection {

    configureRouter(config, router) {
        config.map([       
          { route: ['', 'role-home'], name: 'role-home', moduleId: './role-home', nav: false, title: 'Role Manager' },  
          { route: 'role-create', name: 'role-create', moduleId: './role-create', nav: false, title: 'Add Role' },  
        ]);

        this.router = router;

    }
}
