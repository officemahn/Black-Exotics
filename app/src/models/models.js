const Admin = {
    id: 0,
    email: '',
    password: ''
};

const User = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    registration_date: ''
};

const Car = {
    id: 0,
    plate_number: '',
    brand: '',
    model: '',
    price: 0
};

const Reservation = {
    id: 0,
    pick_date: '',
    drop_date: '',
    user_id: 0,
    car_id: 0,
    total: 0,
    pick_location: '',
    drop_location: ''
};

// TODO: STATE TYPES OF EACH PROPERTY

module.exports = { Admin, User, Car, Reservation }