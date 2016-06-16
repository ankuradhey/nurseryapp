module.exports = function() {

    return {
        'userSchema': {
            user_type: {
                presence: true,
                inclusion: {
                    within: ['parent', 'school', 'admin'],
                    message: "Please enter valid user type"
                }
            },
            user_email: {
                presence: true,
                email: {
                    message: "Please enter valid email address"
                }
            },
            user_password: {
                presence: true,
                length: {
                    minimum: 6,
                    maximum: 50
                }
            },
            user_first_name: {
                presence: true
            },
            user_last_name: {
                presence: true
            },
            user_phone: {
                presence: true,
                format: {
                    pattern: /\d{10}?/
                }
            }
        },
        userLoginSchema: {
            user_email: {
                presence: true,
                email: {
                    message: "Please enter valid email address"
                }
            },
            user_password: {
                presence: true,
                length: {
                    minimum: 6,
                    maximum: 50
                }
            },
            user_type: {
                presence: true,
                inclusion: {
                    within: ['parent', 'school', 'admin'],
                    message: "Please enter valid user type"
                }
            }
        },
        reviewSchema:{
            review_school_id: {
                presence: true
            },
            review_title:{
                presence: true,
                length:{
                    maximum: 100
                }
            },
            review_desc:{
                presence: true,
            },
            review_user_id:{
                presence: true
            },
            review_rating:{
                presence: true,
                length:{
                    minimum:0,
                    maximum:5
                }
            }
        },
        'enquirySchema':{
            enquiry_parent_id: {
                presence:true
            },
            enquiry_school_id:{
                presence:true
            },
            enquiry_message:{
                presence:true,
                length:{
                    minimum:2
                }
            },
            enquiry_parent_name:{
                presence:true
            },
            enquiry_phone:{
                presence:true
            },
            enquiry_email:{
                presence:true
            },
            enquiry_child_age:{
                length:{
                    minimum:3,
                    maximum:25,
                    message:'Child Age is not valid'
                }
            }
        },
        'favSchema':{
            fav_parent_id: {
                presence:true
            },
            fav_school_id:{
                presence:true
            }
        }
    }

}