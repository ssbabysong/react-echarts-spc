// hello.cc
#include <node.h>
#include <math.h>
#include <stdlib.h> 
#include <time.h>


namespace demo {
// using std::
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Array;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
}
void sum(const FunctionCallbackInfo<Value> &args){
    Isolate *isolate = args.GetIsolate();

    if(!args[0]->IsNumber()){
        isolate->ThrowException(v8::Exception::TypeError(
            String::NewFromUtf8(isolate, "args[0] must be a number")));
        return ;
    }
    if(!args[1]->IsNumber()){
        isolate->ThrowException(v8::Exception::TypeError(
            String::NewFromUtf8(isolate, "args[1] must be a number")));
        return ;
    }
    args.GetReturnValue().Set(args[0]->NumberValue() + args[1]->NumberValue());
}
void aveOfArray(const FunctionCallbackInfo<Value> &args){
    Isolate *isolate = args.GetIsolate();
    if(!args[0]->IsArray()){
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "args[0] must be an Array")));
        return ;
    }

    Local<Object>  received_v8_obj = args[0]->ToObject();
    Local<Array> keys = received_v8_obj->GetOwnPropertyNames();
    int length = keys->Length();
    double sum = 0;
    for(int i=0;i<length;i++){
        sum += received_v8_obj->Get(keys->Get(i))->NumberValue();
    }
    args.GetReturnValue().Set(sum/length);
}
void d2OfArray(const FunctionCallbackInfo<Value> &args){
    Isolate *isolate = args.GetIsolate();
    if(!args[0]->IsArray()){
        isolate->ThrowException(v8::Exception::TypeError(
            v8::String::NewFromUtf8(isolate, "args[0] must be an Array")));
        return ;
    }
	srand((unsigned)time(NULL));  

 
    Local<Object>  received_v8_obj = args[0]->ToObject();
    Local<Array> keys = received_v8_obj->GetOwnPropertyNames();
    int length = keys->Length();
    double sum = 0;
    for(int i=0;i<length;i++){
        sum += received_v8_obj->Get(keys->Get(i))->NumberValue();
    }
    double ave= sum/length;
    double d2=0;
    for(int i=0;i<length;i++){
        d2 += (received_v8_obj->Get(keys->Get(i))->NumberValue()-ave)*(received_v8_obj->Get(keys->Get(i))->NumberValue()-ave);
    }
    args.GetReturnValue().Set(rand());
}
void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
  NODE_SET_METHOD(exports, "aveOfArray", aveOfArray);
  NODE_SET_METHOD(exports, "d2OfArray", d2OfArray);
}

NODE_MODULE(addon, init)

} 