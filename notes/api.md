


business create request
curl -X 'POST' \
  'https://dev.kaha.com.np/main/api/v3/businesses-from-web' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "string",
  "entityPrefix": "string",
  "tag": "string",
  "email": "string",
  "contact": "string",
  "mapAddress": {
    "street": "string",
    "district": "string",
    "province": "string",
    "country": "string",
    "municipality": "string",
    "wardNo": "string",
    "generalAddress": "string",
    "googlePlacesData": {},
    "additionalInfo": "string"
  },
  "address": "string",
  "latitude": 0,
  "longitude": 0,
  "isRegisteredPan": true,
  "categoryId": "string",
  "tagLine": "string",
  "website": "string",
  "description": "string",
  "isPickup": true,
  "isDelivery": true,
  "workingDaysAndHours": {},
  "avatarUrl": "string",
  "coverImageUrl": "string",
  "panVatCertificateUrl": "string",
  "buildingImageUrl": "string",
  "buildingInformation": "string",
  "floorNo": "string",
  "businessTypeIds": [
    "string"
  ],
  "gallery": [
    "string"
  ],
  "webGallery": [
    "string"
  ],
  "locatedInBusinessId": "string",
  "qrReservationId": "string",
  "documents": {
    "panId": "string",
    "panVatCertificateUrl": "string",
    "lalpurja": "string",
    "electricityWaterImageUrl": "string",
    "citizenshipImageUrl": "string"
  },
confirmations :{
    "opt": "4444",
    "fullName" : "Rabindra Thakur"
    "contactNumber":  "9862146256"
}

}'




new api : 
for unauthenticated auser
to trigger opt
track if requires new user creation 

post : /unifiedRegistration/otp
"body" : {
"contactNumber" :  9862146252
}

this opt shall be used when submitting hte new business registration form 
- if new user creation is required 
    - create new user ,
    - create business linked to nuew user
else 
    - user already exists (whic is good)
    - create business linked to existing user 





coordinate resolver : 
https://api.kaha.com.np/shapedata/get_info?lat=27.696723&lon=85.323378
{"coordinates":{"lat":27.696723,"lon":85.323378},"result_count":10,"results":[{"district_code":"","formatted":"Unspecified location","province_code":"","source":"/app/h_data/h1/hermes_NPL_everest_0.shp"},{"district_code":"","formatted":"3","province":3,"province_code":"","source":"/app/h_data/h1/hermes_NPL_everest_1.shp"},{"district":"KATHMANDU","district_code":"","formatted":"KATHMANDU, 3","province":3,"province_code":"","source":"/app/h_data/h1/hermes_NPL_everest_2.shp"},{"district":"KATHMANDU","district_code":"","formatted":"Kathmandu, KATHMANDU, 3","municipality":"Kathmandu","province":3,"province_code":"","source":"/app/h_data/h1/hermes_NPL_everest_3.shp","type":"Mahanagarpalika"},{"district":"KATHMANDU","district_code":"","formatted":"Kathmandu, KATHMANDU, 3","municipality":"Kathmandu","province":3,"province_code":"","source":"/app/h_data/h1/hermes_NPL_everest_4.shp","type":"Mahanagarpalika"},{"district_code":"","formatted":"Unspecified location","province_code":"","source":"/app/h_data/h2/hermes_NPL_new_wgs_0.shp"},{"district_code":"","formatted":"Bagmati Pradesh","province":"Bagmati Pradesh","province_code":"3","source":"/app/h_data/h2/hermes_NPL_new_wgs_1.shp"},{"district":"Kathmandu","district_code":"28","formatted":"Kathmandu, Bagmati Pradesh","province":"Bagmati Pradesh","province_code":"3","source":"/app/h_data/h2/hermes_NPL_new_wgs_2.shp"},{"district":"Kathmandu","district_code":"28","formatted":"Kathmandu, Kathmandu, Bagmati Pradesh","local_name":"Kathmandu","province":"Bagmati Pradesh","province_code":"3","source":"/app/h_data/h2/hermes_NPL_new_wgs_3.shp","type":"Mahanagarpalika"},{"district":"KATHMANDU","district_code":"","formatted":"Kathmandu, Kathmandu, KATHMANDU, Bagmati","local_name":"Kathmandu","municipality":"Kathmandu","province":"Bagmati","province_code":"","source":"/app/h_data/h3/local_unit.shp","type":"Mahanagarpalika"}]}




checkkahatag exists ? 
curl -X 'GET' \
  'https://dev.kaha.com.np/main/api/v3/businesses?minRating=0&tag=bravocafe&take=1' \
  -H 'accept: application/json'
   
optional workarounf : 

{
  "meta": {
    "page": null,
    "totalRecords": 1,
    "recordsPerPage": 1,
    "previous": null,
    "next": null,
    "lastPage": 1,
    "hasNext": false
  },
  "data": [
    {
      "id": "645962ea-dc22-4efd-96f3-d922e3f8498c",
      "kahaId": "B-6FF0F1",
      "tag": "BRAVOCAFE",
      "name": "Bravo Cafe & Bar ",
      "entity": "Business",
      "email": "info@bravocafe.com",
      "contact": "9851138780",
      "landline": "9845212502",
      "mapAddress": {
        "id": "f51169e2-ee24-4806-b62a-50eac5d37665",
        "district": "28",
        "province": "3",
        "country": null,
        "municipality": "146",
        "wardNo": "16",
        "generalAddress": "mid baneshwo"
      },
      "location": {
        "type": "Point",
        "coordinates": [
          27.69447259,
          85.337306689
        ]
      },
      "createdAt": "2023-07-17T07:14:42.850Z",
      "address": "27, New Baneshwor, Kathmandu, Nepal",
      "panIsVat": false,
      "tagLine": "Good Food Is Good Mood",
      "description": "Bravo Cafe and Bar is a business wing of Bravo hospitality Pvt. Ltd. It was established to serve the foodie people with tasty, deligntful and healthy foods.",
      "website": "www.bravocafe.com",
      "workingDaysAndHours": {
        "friday": "9:0:0-17:0:0",
        "monday": "9:0:0-17:0:0",
        "sunday": "9:0:0-17:0:0",
        "tuesday": "9:0:0-17:0:0",
        "saturday": "10:0:0-17:0:0",
        "thursday": "9:0:0-17:0:0",
        "wednesday": "9:0:0-17:0:0"
      },
      "available": true,
      "delivery": true,
      "pickup": true,
      "isOfficial": false,
      "avatar": "https://kaha-assets-dev.s3.ap-south-1.amazonaws.com/public_kaha_1689598131651_image_cropper_1689598121715.jpg",
      "coverImageUrl": "https://kaha-assets-dev.s3.ap-south-1.amazonaws.com/public_kaha_1689598199244_image_cropper_1689598193529.jpg",
      "buildingImageUrl": "https://kaha-assets-dev.s3.ap-south-1.amazonaws.com/public_kaha_1689598009746_image_cropper_1689598003024.jpg",
      "buildingInformation": "D&D complex",
      "gallery": [
        "https://kaha-assets-dev.s3.amazonaws.com/public_kaha_1721970554636_kaha-img.png"
      ],
      "floorNo": "First Floor",
      "homeId": null,
      "view360Url": "https://kaha-assets-dev.s3.ap-south-1.amazonaws.com/public_kaha_1715577870915_bravo.jpg",
      "additionalInfo": null,
      "rejectionReason": null,
      "status": {
        "value": "verified",
        "type": "business_status"
      },
      "category": {
        "id": "40c18dd3-9951-48e9-bd56-24fbf400f73a",
        "name": "Restaurant",
        "iconUrl": "https://kaha-api-test.masovison.com/categories/it_icon.png",
        "markerUrl": "https://kaha-api-test.masovison.com/categories/restaurant_marker.png",
        "level": null
      },
      "distance": 0,
      "latitude": 27.69447259,
      "longitude": 85.337306689,
      "averageRating": 0,
      "isVisible": true,
      "secondaryContact": "9845212502",
      "hasOwnershipClaim": true,
      "parentBusiness": {
        "id": null,
        "name": null,
        "tag": null
      },
      "businessTypes": [
        {
          "id": "64968816-27e1-43d1-8888-008f7cce223e",
          "name": "RETAILER"
        },
        {
          "id": "a2817a08-6a9c-431b-b4f2-7d272b309529",
          "name": "WHOLESELLER"
        }
      ],
      "owner": {
        "id": "86d7ebbd-bce8-4510-b3da-f62b7ea2be72",
        "fullName": "Narayan Chhetri"
      }
    }
  ]
}
-

tag search actual api : 
- 

use this api for tag check : 

curl -X 'GET' \
  'https://dev.kaha.com.np/main/api/v3/businesses/available-tag/bravocafe' \
  -H 'accept: application/json'


  {
  "isAvailableTag": true,
  "business": {

    "id": "string",
    "name": "string",
    "email": "string",
    "address": "string",
    "tag": "string",
    "kahaId": "string",
    "avatarUrl": "string",
    "buildingImageUrl": "string",
    "coverImageUrl": "string",
    "gallery": [
      "string"
    ],
    "buildingInformation": "string",
    "contact": "string"
  }
}