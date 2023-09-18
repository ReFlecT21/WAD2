
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


import React, { useEffect, useState } from 'react';



function signup() {

  const [count, setCount] = useState(0)
  var [express_response] = useState(null)

  useEffect(() => {
    fetch('/frontend_test2')
        .then(response => response.text())
        .then(text => express_response = text);
  }, []);

  return (
    <>
    <div>
         <img src="pictures/Human.jpg" alt="Left Image" class="img1"/> 
    </div>
<div class="row">
    {/* <!-- segment out half the page --> */}
    <div class="col-7"></div>

{/* <!-- split page into almost half --> */}
    <div class="col-4">

{/* <!-- put image with upper padding --> */}
        <div class="row pb-3 ">
            <img src="pictures/MenuMate.png" class="w-25 m-auto pt-5" alt=""/>
        </div>

{/* <!-- put another row to cater for all form inputs --> */}
        <div class="row">

            <div class="container">
                {/* <!-- First Row --> */}
                <div class="row">
                  <div class="col-md-6 ">
                    <input type="text" class="form-control form-control-lg roundcorners" placeholder="First name"/>
                  </div>
                  <div class="col-md-6 ">
                    <input type="text" class="form-control form-control-lg roundcorners" placeholder="Last name"/>
                  </div>
                </div>
              
{/*               
                <!-- Add 2 extra cols to sandwhich the input bar to adjust the sizes -->
                <!-- Second Row --> */}
                <div class="row row-gap">
                  <div class="col-md-1">
                  </div>

                  <div class="col-md-10">
                    <input type="text" class="form-control form-control-lg roundcorners" placeholder="Email "/>
                  </div>

                  <div class="col-md-1">
                  </div>
                </div>


                {/* <!-- Add 2 extra cols to sandwhich the input bar to adjust the sizes -->
                <!-- Third Row --> */}
                <div class="row row-gap">
                  <div class="col-md-0">
                  </div>

                  <div class="col-md-12">
                    <input type="text" class="form-control form-control-lg roundcorners" placeholder="Password"/>
                  </div>

                  <div class="col-md-0">
                  </div>
                </div>
              </div>

        </div>

        {/* <!-- put another row for submit button with some upper margin --> */}
       <div class="row mt-4 ">
        <button type="button" class="btn btncol m-auto btn-lg roundcorners">Start your journey!</button>
       </div>

       {/* <!-- add another row to put login suggestion --> */}
       <div class="row whitetext mt-3 ">
        <div class="m-auto">
        Already have an account? <a href=""> Log in</a>
        </div>
       </div>



    </div>

    {/* <!-- split page into 3 with this added column to add some space at the back --> */}
    <div class="col-1"></div>

</div>
    </>
  )
}

export default signup
