
export class UsersCreate {
    heading = 'Create a New User';

    contact = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    };

    get canSave() {
        return this.contact.firstName && this.contact.lastName;
    }

    save() {
        console.log('saved!');
    }

}
