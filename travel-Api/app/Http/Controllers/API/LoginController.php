<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function userDashboard()
    {
        $users = User::all();
        $success =  $users;


        // return view('');
        return response()->json($success, 200);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function adminDashboard()
    {
        $users = Admin::all();
        $success =  $users;

        return response()->json($success, 200);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */

    public function loginPage(){

    return response()->json([],200);
    }

    public function userLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->all()]);
        }

        if(auth()->guard('user')->attempt(['email' => request('email'), 'password' => request('password')])){

            config(['auth.guards.api.provider' => 'user']);
            
            $user = User::select('users.*')->find(auth()->guard('user')->user()->id);
            $success =  $user;
            $success['token'] =  $user->createToken('MyApp',['user'])->accessToken; 

            $response = response()->json($success, 200);
            $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
            return $response;
    
        }else{ 
            $response = response()->json(['error' => ['Email and Password are Wrong.']], 200);
            $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
            return $response;}
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function adminLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->all()]);
        }

        if(auth()->guard('admin')->attempt(['email' => request('email'), 'password' => request('password')])){

            config(['auth.guards.api.provider' => 'admin']);
            
            $admin = Admin::select('admins.*')->find(auth()->guard('admin')->user()->id);
            $success =  $admin;
            $success['token'] =  $admin->createToken('MyApp',['admin'])->accessToken; 

            return response()->json($success, 200);
        }else{ 
            return response()->json(['error' => ['Email and Password are Wrong.']], 200);
        }
    }


   

}
