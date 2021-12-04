const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs')

const User = require('../models/user');


const sendmail = require('sendmail')({
    logger: {
      debug: console.log,
      info: console.info,
      warn: console.warn,
      error: console.error
    },
    silent: false,
    
    devPort: 5500, // Default: False
    devHost: 'localhost', // Default: localhost
    smtpPort: 2525, // Default: 25
    smtpHost: 'localhost' // Default: -1 - extra smtp host after resolveMX
  });

router.post('/', (req, res) => {
    User.find({email : req.body.email})
            .then(user => {
                if(user.length > 1) {
                    res.status(401).json({
                        message : "Email Already Exists"
                    })
                } else {
                    bcryptjs.hash(req.body.password, 10, (err, hash) => {
                        if(err) {
                            return res.status(500).json({
                                error : err
                            })
                        }else{
                            const user = new User({
                                name : req.body.name,
                                email : req.body.email,
                                mobile : req.body.mobile,
                                password : hash
                            })

                            user.save()
                                .then(result => {
                                    sendmail({
                                        from: 'no-reply100192@gmail.com',
                                        to: result.email,
                                        subject: `Hello ${result.name}, Welcome`,
                                        html: 'Mail of welcome sendmail ',
                                      }, function(err, reply) {
                                        console.log(err && err.stack);
                                        console.dir(reply);
                                    });
                                    console.log(result)
                                    res.status(201).json({
                                        message : result
                                    })
                                    
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error : err
                                    })
                                })
                        }
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error : err
                })
            })
})


module.exports = router ;