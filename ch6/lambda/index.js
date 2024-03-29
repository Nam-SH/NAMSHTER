const AWS = require('aws-sdk');
const Sharp = require('sharp');

const S3 = new AWS.S3({
  region: 'us-east-2',
});

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = event.Records[0].s3.object.key;
  
  const filename = Key.split('/')[Key.split('/').length - 1];
  const ext = Key.split('.')[Key.split('.').length - 1];
  
  // console.log(Key, filename, ext);

  // sharp는 jpg를 사용 안 하고 jpeg를 사용하므로 확장자를 바꿔야 함
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; 
  
  try {
    // S3에서 이미지를 가져온다.(getObject)
    const s3Object = await S3.getObject({ 
      Bucket,
      Key,
    }).promise();
    // console.log('original', s3Object.Body.length);
    const resizedImage = await Sharp(s3Object.Body)
      .resize(800, 800, {
        fit: 'inside',
      })
      .toFormat(requiredFormat)
      .toBuffer();

    // console.log('resize', resizedImage.length);
    await S3.putObject({
      Body: resizedImage,
      Bucket,
      Key: `thumb/${filename}`,
    }).promise();
    
    return callback(null, `thumb/${filename}`);
  } 
  catch (err) {
    console.error(err);
    return callback(err);
  }
};