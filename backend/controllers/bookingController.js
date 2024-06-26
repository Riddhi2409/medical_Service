const User=require('../models/UserSchema')
const Doctor=require('../models/doctorSchema');
const Booking=require('../models/BookingSchema')
const Stripe=require('stripe')

exports.getCheckoutSession = async(req,res)=>{
    try{
        const doctor = await Doctor.findById(req.params.doctorId)
        const user=await User.findById(res.userId)
        const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)
        console.log(`${process.env.CLIENT_SITE_URL}/checkout-success`)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency: 'inr',
                        unit_amount: doctor.ticketPrice * 100,
                        product_data: {
                            name: doctor.name,
                            description: doctor.bio,
                            images: [doctor.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        })

        const booking = new Booking({
            doctor: doctor._id,
            user:user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        })
        await booking.save()
        console.log(booking)
        res.status(200).json({success: false,message: "Successfully paid",session})

    }catch(err){
        console.log(err)
        res.status(500).json({success: false,message: "Error creating checkout session"})
    }
}