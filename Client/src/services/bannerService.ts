import HttpClient from "../http/httpClient";

export default class BannerService {

   async listarBanners() {
      try {
         const response = await HttpClient.get('Banner/listar');
         if (response.status !== 200) {
            return false;
         }
         const dados = await response.json();
         return dados;
      } catch (error) {
         console.error(error);
         return null;
      }
   }

   async listarBannerPorId(id: number) {
      try {
         const response = await HttpClient.get(`Banner/listar/$${id}`);
         if (response.status !== 200) {
            return false;
         }
         const dados = await response.json();
         return dados;
      } catch (error) {
         console.error(error);
         return null;
      }
   }

   async cadastrarBanner(dados: any) {
      try {
         const response = await HttpClient.postFormData('Banner/cadastrar', dados, true);
         if (response.status !== 200) {
            return false;
         }
         return true;
      } catch (error) {
         console.error(error);
         return false;
      }
   }

   async EditBanner(dados: any) {
      try {
         const response = await HttpClient.putFromData('Banner/alterar', dados, true);
         if (response.status !== 200) {
            return false;
         }
         return true;
      } catch (error) {
         console.error(error);
         return false;
      }
   }

   async deletarBanner(id: number) {
      try {
         const response = await HttpClient.delete(`Banner/deletar/$${id}`, true);
         if (response.status !== 200) {
            return false;
         }
         return true;
      } catch (error) {
         console.error(error);
         return false;
      }
   }
}