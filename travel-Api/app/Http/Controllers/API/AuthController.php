<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function userLogin(Request $request,$slug){



        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()->all()]);
        }
           
if ($slug=='admin'){
            if (Auth::guard('admin')->attempt(['email' => request('email'), 'password' => request('password')])) {
        
                
                $admin = Auth::guard('admin')->user();
              
              
                $token = $admin->createToken('MyApp',['admin'])->accessToken;
                $success = [
                    'admin' => $admin,
                    'token' => $token,
                ];
             
                $response = response()->json($success, 200);
                $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
                $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        
                return $response;            } 
            else { 
                $response = response()->json(['error' => ['Email and Password are Wrong.']], 200);
                $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
                $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        
                return $response;
            }
        

        }


        
        if ($slug=='user'){
    if (Auth::guard('user')->attempt(['email' => request('email'), 'password' => request('password')])) {
        $user = Auth::guard('user')->user();
      
        $token = $user->createToken('MyApp',['user'])->plainTextToken;
        

        $success = [
            'user' => $user,
            'token' => $token,
        ];

        $response = response()->json($success, 200);

        // Add the Access-Control-Allow headers
        $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

       
        

        return $response;
               } 
    else { 
        $response = response()->json(['error' => ['Email and Password are Wrong.']], 200);
        $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

        return $response;
    }



}
    
    }


    public function registerUser(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:users',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Return validation errors as JSON
        }
    
    
        $user = User::create([
            'name' => $request['name'],
            'password' => Hash::make($request['password']),
            'email' => $request['email']
        ]);
       

        $success = [
            'user' => $user,
            'success' => 'User created successfully',
        ];
     
      
        $response= response()->json($success, 200);
        $response->header('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');


        return $response;

    }

   


    public function destroy(Request $request, $slug) {

        
        if ($slug == 'user') {
            $user = auth('sanctum')->user();
       

    
            if ($user) {
                $user->tokens()->delete();
             
                return response()->json(['message' => 'You have been successfully logged out.']);
            } else {
                return response()->json(['error' => 'User not logged in.'], 401);
            }
        } else {
            return response()->json(['error' => 'Invalid slug.'], 400);
        }
    }
        
    
    
   
}
