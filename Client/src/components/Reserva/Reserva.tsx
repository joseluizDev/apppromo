import { zodResolver } from "@hookform/resolvers/zod";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import ReservaService from "../../services/reservaService";
import { Banner } from "../Banner/Banner";
import { ProductCard } from "../ProductCard/ProductCard";
import PromoBanner from "../PromoBanner/PromoBanner";

type Product = {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    precoPromocional: number;
    quantidade: number;
    instagram: string;
    whats: string;
    imagens: Array<{ url: string }>;
};

type Products = {
    id: number;
    titulo: string;
    descricao: string;
    preco: number;
    precoPromocional: number;
    quantidade: number;
    instagram: string;
    whats: string;
    imagens: string;

}

type Reserva = {
    id: number;
    nome: string;
    email: string;
    telefone: number;
    instagram: string;
    endereco: string;
    referencia: string;
    entrega: true;
    retirada: false;
    quantidade: number;
    valorTotal: number;
    produto: Products;
}

const productSchema = z.object({
    nome: z
        .string()
        .min(1, "Nome é obrigatório")
        .regex(/^\w+\s\w+$/, "Informe pelo menos dois nomes"),
    email: z
        .string()
        .min(1, "Email é obrigatório")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Insira um endereço de email válido"),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    instagram: z.string().min(1, "Instagram é obrigatório"),
    endereco: z.string().optional(),
    referencia: z.string().optional(),
    metodoRecebimento: z
        .string()
        .min(1, "Método de recebimento é obrigatório"),
    quantidade: z
        .number()
        .positive("Quantidade deve ser maior que 0"),
}).superRefine((data, ctx) => {
    if (data.metodoRecebimento === "entrega" && !data.endereco) {
        ctx.addIssue({
            code: "custom",
            path: ["endereco"],
            message: "Endereço é obrigatório quando o método de recebimento é entrega",
        });
    }
});


type ProductFormData = z.infer<typeof productSchema>;

export default function Reserva() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            quantidade: 1,
            metodoRecebimento: "entrega",
        },
    });

    const produtoLocal = localStorage.getItem("produto");
    const [produto, setProduto] = useState<Product>(produtoLocal ? JSON.parse(produtoLocal) : null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [reserva, setReserva] = useState<Reserva>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const quantidade = watch("quantidade") || 1;
    const metodoRecebimento = watch("metodoRecebimento");

    const precoUnitario =
        produto && produto.precoPromocional > 0
            ? produto.precoPromocional
            : produto?.preco || 0;

    const valorTotal = quantidade * precoUnitario;

    const onSubmit = async (data: ProductFormData) => {
        try {
            let boolEntrega = false;
            let boolRetirada = false;

            if (data.metodoRecebimento === "entrega") {
                boolEntrega = true;
            } else {
                boolRetirada = true;
                data.endereco = "";
                data.referencia = "";
            }

            const obj = {
                nome: data.nome,
                email: data.email,
                telefone: data.telefone,
                endereco: data.endereco,
                referencia: data.referencia!,
                metodoRecebimento: data.metodoRecebimento,
                instagram: data.instagram,
                ProdutoId: produto.id,
                quantidade: data.quantidade,
                entrega: boolEntrega,
                retirada: boolRetirada,
            };
            const reservaService = new ReservaService();
            const reserva = await reservaService.CriarReserva(obj);
            if (!reserva) {
                return toast.error("Erro ao salvar reserva. Tente novamente.");
            }
            toast.success("Reserva salva com sucesso!");
            setReserva(reserva);
            reset();
            localStorage.removeItem("produto");
            setIsModalOpen(true);
        } catch (error) {
            toast.error("Erro ao salvar reserva. Tente novamente.");
        }
    };

    const onCancel = () => {
        localStorage.removeItem("produto");
        navigate("/");
    };

    const closeModal = () => {
        reset();
        setIsModalOpen(false);
        navigate("/");
    };

    const generatePDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const element = document.getElementById("recibo");
            if (!element) return;

            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save("recibo.pdf");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Banner />
            <PromoBanner />
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-center items-stretch gap-8 max-w-7xl mx-auto">
                    {
                        produto ? (
                            <div className="flex flex-col lg:flex-row rounded-lg shadow-md">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="w-full lg:w-1/2 bg-white p-6"
                                >
                                    <div className="text-gray-600 flex items-center justify-start mb-2">
                                        <h1 className="text-2xl font-semibold">Dados para Reserva</h1>
                                    </div>
                                    <div className="space-y-2">
                                        {/* Nome Completo */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nome completo
                                            </label>
                                            <input
                                                {...register("nome")}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="Nome completo"
                                            />
                                            {errors.nome && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.nome.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email
                                            </label>
                                            <input
                                                {...register("email")}
                                                type="email"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="exemplo@dominio.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* Telefone e Instagram */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Telefone
                                                </label>
                                                <input
                                                    {...register("telefone")}
                                                    type="tel"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    placeholder="(99) 99999-9999"
                                                />
                                                {errors.telefone && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.telefone.message}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Instagram
                                                </label>
                                                <input
                                                    {...register("instagram")}
                                                    type="text"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                    placeholder="@instagram"
                                                />
                                                {errors.instagram && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {errors.instagram.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {metodoRecebimento == "entrega" && (
                                            <>
                                                {/* Endereço */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Endereço
                                                    </label>
                                                    <input
                                                        {...register("endereco")}
                                                        type="text"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        placeholder="Rua, número, bairro"
                                                    />
                                                    {errors.endereco && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.endereco.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Referência */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Referência (Opcional)
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                        {...register("referencia")}
                                                        placeholder="Referência para entrega"
                                                    />
                                                    {errors.referencia && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.referencia.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Quantidade */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Quantidade
                                            </label>
                                            <input
                                                {...register("quantidade", { valueAsNumber: true })}
                                                type="number"
                                                min={1}
                                                max={produto.quantidade}
                                                placeholder={`Máximo: ${produto.quantidade}`}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                            {errors.quantidade && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.quantidade?.message}
                                                </p>
                                            )}
                                            {/* Valor total */}
                                            <div className="mt-2 text-lg font-semibold text-purple-600">
                                                Total: R$ {valorTotal.toFixed(2)}
                                            </div>
                                        </div>

                                        {/* Entrega ou Retirada */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Método de Recebimento
                                            </label>
                                            <div className="flex flex-col md:flex-row items-start gap-4">
                                                <div className="flex items-center">
                                                    <input
                                                        {...register("metodoRecebimento", {
                                                            required: "Escolha uma opção.",
                                                        })}
                                                        type="radio"
                                                        id="entrega"
                                                        value="entrega"
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="entrega"
                                                        className="ml-2 text-sm text-gray-700"
                                                    >
                                                        Entrega
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        {...register("metodoRecebimento", {
                                                            required: "Escolha uma opção.",
                                                        })}
                                                        type="radio"
                                                        id="retirada"
                                                        value="retirada"
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="retirada"
                                                        className="ml-2 text-sm text-gray-700"
                                                    >
                                                        Retirada
                                                    </label>
                                                </div>
                                            </div>
                                            {errors.metodoRecebimento && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.metodoRecebimento.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                                        <button
                                            type="button"
                                            onClick={onCancel}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                                        >
                                            Reservar
                                        </button>
                                    </div>
                                </form>

                                <div className="w-full lg:w-1/2 bg-white p-6">
                                    <h1 className="text-2xl font-semibold text-gray-600">
                                        Detalhes do Produto
                                    </h1>
                                    <ProductCard product={produto} isAcao={false} />
                                </div>
                            </div>

                        ) : (
                            <div className="flex items-center justify-center h-96">
                                <h1 className="text-2xl font-semibold text-gray-600">
                                    Nenhum produto selecionado.
                                </h1>
                            </div>
                        )}
                </div>
                {
                    isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" id="recibo" >
                            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto" >
                                <h2 className="text-2xl font-bold text-center mb-4">
                                    Reserva Realizada com Sucesso! 🎉
                                </h2>
                                <div className="border-b pb-4">
                                    <h3 className="text-lg font-semibold mb-2">Dados do Cliente:</h3>
                                    <div className="mb-2">
                                        <strong>Nome:</strong> {reserva?.nome}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Email:</strong> {reserva?.email}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Telefone:</strong> {reserva?.telefone}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Endereço:</strong> {reserva?.endereco || "Não informado"}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Referência:</strong> {reserva?.referencia || "Não informado"}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Método de Recebimento:</strong>{" "}
                                        {reserva?.entrega ? "Entrega" : "Retirada"}
                                    </div>
                                </div>
                                <div className="mt-4 border-b pb-4">
                                    <h3 className="text-lg font-semibold mb-2">Dados do Produto:</h3>
                                    <div>
                                        <strong>Num. Pedido:</strong> #{reserva?.id}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Produto:</strong> {reserva?.produto?.titulo}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Descrição:</strong> {reserva?.produto?.descricao}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Quantidade:</strong> {reserva?.quantidade}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Preço Unitário:</strong> R$ {reserva?.produto?.precoPromocional! > 0 ? reserva?.produto?.precoPromocional.toFixed(2) : reserva?.produto?.preco.toFixed(2)}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Total:</strong> R$ {reserva?.valorTotal.toFixed(2)}
                                    </div>
                                </div>
                                <div className="mt-4 border-b pb-4">
                                    <h3 className="text-lg font-semibold mb-2">Dados do Vendedor:</h3>
                                    <div className="mb-1">
                                        <strong>Instagram:</strong> {produto?.instagram || "Não informado"}
                                    </div>
                                    <div className="mb-1">
                                        <strong>WhatsApp:</strong> {produto?.whats || "Não informado"}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Observações:</h3>
                                    <p className="text-gray-600">
                                        Obrigado por comprar conosco! Caso tenha dúvidas, entre em contato pelo WhatsApp ou Instagram.
                                    </p>
                                </div>

                                {!isGeneratingPDF ? (
                                    <div>
                                        <button
                                            onClick={generatePDF}
                                            className="mt-2 px-4 py-2 w-full bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Baixar Recibo (PDF)
                                        </button>
                                        <button
                                            onClick={closeModal}
                                            className="mt-6 px-4 py-2 w-full bg-purple-600 text-white rounded-md hover:bg-purple-700"
                                        >
                                            Fechar
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 mt-4">Gerando recibo, por favor aguarde...</p>
                                )}

                            </div>
                        </div>
                    )
                }
            </div >
        </div >
    );
}
