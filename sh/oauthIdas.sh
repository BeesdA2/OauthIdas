
echo "parameter 1" $1
echo "parameter 1" $2
echo "parameter 1" $3
export PATH=/QOpenSys/pkgs/lib/nodejs10/bin:$PATH;  
export LIBPATH=/QOpenSys/pkgs/lib/nodejs10/bin:$LIBPATH;
export NODE_PATH=/QOpenSys/pkgs/lib/nodejs10/node_modules:$NODE_PATH;
node -v;

node /Beesda2/NodeJS/Productie/OauthIdas/js/oauthValidate.js $1 $2 $3;
