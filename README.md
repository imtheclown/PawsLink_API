# 1.Installation
*note: make sure to install a node js application in your computer before running the program. Here is a step by step installation of Node js in windows by GeeksforGeeks.com: <https://www.geeksforgeeks.org/installation-of-node-js-on-windows/>*
1. Pull the repository at `https://www.mongodb.com/cloud/atlas/register`
2. Unzip the file.
3. Open command prompt and got to the location where you unzipped PawsLink_API.
4. Go inside PawsLink-API folder.
5. Type `npm install`.
6. Wait for the installations to complete.
# 2.Creating Mongo DB account
## 2.1 Creating a MongoDB Atlas acount
If you already have a MongoDB Atlas account, skip to 2.2
1. Go to <https://www.mongodb.com/cloud/atlas/registerhttps://www.mongodb.com/cloud/atlas/register> and register for a new MongoDB Atlas free account
2. After registering, anser the questions prompted by the MongoDB.Your answers in this section does not matter for the next section. Submit answer and proceed to your account.
3. MongoDB will prompt you on your cluster. You can choose to buy their paid services but the free M0 cluster is sufficient
4. Select your provider and press create deployment.
## 2.2 Connecting to MongoDB Atlas using connection string
1.After the creation of your cluster is complete, get the connection string and user credentials by pressing the connect button.
![connect image](/images/connect.png)
2. Add your current IP address (MongoDB automatically adds this on new user accounts).
3. For new Accounts, create a new database user by filling up the username and password boxes followed by pressing te create database user button. Make sure to copy the newly created user and password.
![create user](/images/create_user.png)
4. Press choose connection button.
5. Choose the Drivers option
![choose connection method](/images/connection_method.png)
6.Copy the connection string and replace the myuser with your newly created user's username and replace the password with your user's password. Make sure to remove the angle brackets in password.
![get connection string](/images/get_connection_string.png)
7.Return to the working directory and navigate to the server folder. Open the config.js file and change the value of dbUri with your connection string
![change dbUri](/images/change_dburi.png)

# 3.Create an AWS account to host images online
## 3.1 Creating an S3 Bucket
1. Go to <https://aws.amazon.com> and create a new account. 
2. Log in to your newly created aws account.
3. On the top left of the interface, click services and in the search box type S3.
4. Click the result with the name S3.
![search s3 bucket](/images/s3_bucket.png)
5. Create a new bucket by pressing the create bucket button.
![create bucket](/images/create_bucket.png)
5. Give the bucket unique name. Take a copy of the bucket name and the AWS region. The remaining settings can be left as default.
![give bucket name](/images/bucket_name.png)
6. Scroll down to the bottom of the page and press the create bucket button. This will return to the S3 interface and your new bucket is no registered.
7. Click the name of youre newly created bucket. This will redirect you to the control interface of your bucket.
8. In the bucket control interface, go to properties and copy the region and the bucket name. 
![bucket properties](/images/bucket_properties.png)
9. In the config.js file, under the AWS_CRED object, replace the bucket property with the bucket name and the region with the region taken from the S3 bucket control interface.
![aws object](/images//aws_object.png)
## 3.2 Creating an S3 Policy
1. Click the services button in AWS interface and type IAM in the searchbox.
2. Click the result with IAM ttile.
![iam user](/images/iam_user.png)
3. In the IAM user interface, go to the policies and add a new policy by clicking the create policy button.
![create policy](/images/create_policy.png)
4. In the create policy interface, select S3 as the desired service to create permission.
![s3 service](/images//s3_service.png)
5. Under the actions allowed, expand the Read and Write. In the Read list, search and check the box with label putObject. In the Write list search and check the boxes with labels deleteObject and putObject.
![permission](/images/permission.png)
6. Scroll down to the bottom page and under the resources, click add ARN.
![add arn](/images/add_arn.png)
7. In the resource bucket name, enter the name of your S3 bucket. In the resource object name check the checkbox for Any Object Name. The resource arn will be automatically updated when you add the resource bucket name.
![edit arn](/images/edt_arn.png)
8. Press the add ARNs button to finish adding the ARNs.
9. Press the next button to proceed to the review policy page.
10. Provide name for the policy and if necessary provide description.
![review create](/images/review_create.png)
11. Scroll down and press the create policy button to finish creating the policy.
## 3.3 Creating an IAM user
1. In the IAM user interface, go to users.
2. Press the create user button to start creating a new user.
![create user](/images/users.png)
3. Provide new name for the user.
4. Click the create an IAM user radio button. 
![add username](/images/user_name.png)
5. Create a password for the new user automatically or create a custom password. Remember this password.
![console pass](/images/console_pass.png)
6. Press next.
7. In the permissions options, choose Attach Policies Directly.
8. In the searchbox, type the name of your newly created policy above.
9. Press the plus symbol before the name of the policy to add the policy.
![set permission](/images/set_permission.png)
10. Press next to proceed to next page.
11. Copy the username and the password and press create user.
12. After successful creation of user, press the return to user list button.
13. In the list of users, press the name of your newly created IAM user.
14. In the IAM user interface, press the create access key button.
![create access key](/images//create_access_key.png)
15. In the access key use case, select other and press next.
![other](/images/other.png)
16. Press the create access key button to generate the access key.
![create access key](/images/set_desc_tag.png)
16. Copy the access key and the secret access key.
![access key](/images/access_key.png)
17. In the config.js file, set the value of username to the value of the newly created username. Set the password to the password to the password of the newly created user. Set the access key with the newly generated access key and the secret access key with the newly generated secret access key.
![aws object](/images/aws_object.png)

*For more information on setting up s3 with express server, watch this youtube video <https://www.youtube.com/watch?v=eQAIojcArRY> and for the updated process for the generation of new access key: <https://www.youtube.com/watch?v=eElHCn4nDZw>*
# 4.Setting up Nodemailer
In order to use nodemailer in this application, we need a gmail address with 2-step verification enabled.
1. Create a gmail account. 
2. Enable 2-step verification.
3. In your google account settings, click 2-step verification.
![2-step](/images/2-step-verification.png)
4. Scroll to the bottom and click App passwords
![app-pass](/images/app_pass.png)
5. Create a new app password by providing the name of the application. 
![create-app-pass](/images/create_app_pass.png)
6. Press the create button to generate an app password.
7. Copy the resulting app password. 
![generated-app-password](/images/generated_app_pass.png)
8. In config.js, under the emailCreds object, provide the your gmail account's username as the value for the username property, and the newly generated app password as the value for the password property.
![email-creds](/images/emailCreds.png)
# 5.Starting the Server
1. Open command prompt.
2. Go to the root directory of the program.
3. Type `npm run devStart` and press enter.