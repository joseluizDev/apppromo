import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function uploadToMinIO(
  bucketName: string,
  filePath: string,
  file: File
): Promise<string> {
  try {
    // Configuração do cliente S3
    const client = new S3Client({
      endpoint: 'https://apis-minio.uwqcav.easypanel.host/',
      region: 'us-east-1', // Região genérica (MinIO não depende disso)
      credentials: {
        accessKeyId: 'fLcdHPZhcymKr6XBKXLn',
        secretAccessKey: 'f5NVPdNW7ivSgv5C0gP3Ub7B1JkwDb2wtPsW5Peh',
      },
    });

    // Comando para fazer o upload
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filePath,
      Body: file,
      ContentType: file.type || 'application/octet-stream',
    });

    // Executa o comando
    await client.send(command);
    return `Arquivo '${file.name}' enviado com sucesso para '${filePath}'!`;
  } catch (error: any) {
    console.error('Erro ao enviar o arquivo:', error);
    return `Erro ao enviar o arquivo: ${error.message || error}`;
  }
}
