export type form = {
    first: string,
    last: string,
    middle: string,
    dob: string,
    email: string,
    password: string,
    confirmpassword: string,
    street: string,
    city: string,
    state: string,
    zipcode: string,
    plantype: string,
    planperiod: string
}

export type users = form & {
    created: Date;
    column: string;
}