import React, { Component } from 'react';



class Profile extends Component{

    render(){
        return(
            <div class="container">
            <div class="row">
                
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
  		                                <div class="col-sm-10"><h1>User name</h1></div>
    	                                <div class="col-sm-2"><a href="/users" class="pull-right"><img title="profile image" class="img-circle img-responsive" src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100"  /></a></div>
                                     </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <form>
                                      <div class="form-group row">
                                        <label for="username" class="col-4 col-form-label">User Name</label> 
                                        <div class="col-8">
                                          <input id="username" name="username" placeholder="Username" class="form-control here" required="required" type="text" />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="name" class="col-4 col-form-label">First Name</label> 
                                        <div class="col-8">
                                          <input id="name" name="name" placeholder="First Name" class="form-control here" type="text" />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="lastname" class="col-4 col-form-label">Last Name</label> 
                                        <div class="col-8">
                                          <input id="lastname" name="lastname" placeholder="Last Name" class="form-control here" type="text" />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="text" class="col-4 col-form-label">Nick Name*</label> 
                                        <div class="col-8">
                                          <input id="text" name="text" placeholder="Nick Name" class="form-control here" required="required" type="text" />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="select" class="col-4 col-form-label">Display Name public as</label> 
                                        <div class="col-8">
                                          <select id="select" name="select" class="custom-select">
                                            <option value="admin">Admin</option>
                                          </select>
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="email" class="col-4 col-form-label">Email*</label> 
                                        <div class="col-8">
                                          <input id="email" name="email" placeholder="Email" class="form-control here" required="required" type="text" />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="website" class="col-4 col-form-label">Website</label> 
                                        <div class="col-8">
                                          <input id="website" name="website" placeholder="website" class="form-control here" type="text" />
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="publicinfo" class="col-4 col-form-label">Public Info</label> 
                                        <div class="col-8">
                                          <textarea id="publicinfo" name="publicinfo" cols="40" rows="4" class="form-control"></textarea>
                                        </div>
                                      </div>
                                      <div class="form-group row">
                                        <label for="newpass" class="col-4 col-form-label">New Password</label> 
                                        <div class="col-8">
                                          <input id="newpass" name="newpass" placeholder="New Password" class="form-control here" type="text" />
                                        </div>
                                      </div> 
                                      <div class="form-group row">
                                        <div class="offset-4 col-8">
                                          <button name="submit" type="submit" class="btn btn-primary">Update My Profile</button>
                                        </div>
                                      </div>
                                    </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Profile;