

registration flow 
- api endpoint 
- post whall be available 
- request json shall be available 




form fields should contain 
- name 
- suggested kaha tag
images: 
- avatar
- cover

map :
 - location coordinate picked from map
 - ward and municiplaity entered manually 

description : 
- multiline text about business



helper methods: 
- isSuggestedTagAvailable
- resolveAddressFromCoordinate
- uploadImage
- composeDummyprofileFromFormData



submit :
---- backend planning  
-> enter owner contact number : 
- check contact registered on kaha
- if user doesnt exist :
    - name 
    - contact 
    - create

    - recieve otp->enter otp and submit
- if user exist : 
    - submit 

--- though pricess --- 
: immediate actions post registration 
- login 
- list businesss 
- manage business
------ 


blocker : time blocker | accessability blocker: 
- pending -> approved

- not a hard blocker 


= blocker for ai that is doing this activity : 
- showng map:
- picking location 
- resolving address(administrative, provience , district , municipality)

solutions : 
    - static json avavilable  for administrative hierarchy 
    - api available for address resolution 




plan : 

- gather api for business post 
- compse data for post 
- implement coordinate resolver 
    - gather api 
    - compose data 
- integrate map 
    - location / coordinate picker 
    - integrate with coordinate resolver 
- display location pikcer 
- compose dummy data with resolved coordinates for picked address

- compose kaha tag from name 
- implement existing tag check 
    - gather api 
    - make validation 

- implement image picker 
    - gather api
    - submit image
    - get image url as response 

- integrate compose the whole form 
- addd additiional fields in hte form 
- map additional fields to the dummy data. 


blocker : user must exist to create a business 
user creation : 
new resistration with existing user :
- hit tigger otp
    = response : 
    - messsage:
    - requiresName: this boolean filds identifies if we show show another form to ask form usernmae for the new user , [false]
- enter otp in otp fieds
- submit 
- notify as complete 
new resigtration with new user : 
- hit tigger otp
    = response : 
    - messsage:
    - requiresName: this boolean filds identifies if we show show another form to ask form usernmae for the new user , [true]
- show name fields with otp filed
- enter otp and name
- submit 
- notify as complete




