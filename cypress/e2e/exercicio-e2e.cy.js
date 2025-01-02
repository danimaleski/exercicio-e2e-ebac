/// <reference types="cypress" />
import produtosSelect from "../support/page_objects/products.page.js";
const perfil = require("../fixtures/perfil.json");

context("Exercicio - Testes End-to-end - Fluxo de pedido", () => {
	/*  Como cliente
      Quero acessar a Loja EBAC
      Para fazer um pedido de 4 produtos
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

	beforeEach(() => {
		cy.visit("/");
	});

	it("Deve fazer um pedido na loja Ebac Shop de ponta a ponta", () => {
		//Acessar a página, logar e verificar se logou
		cy.get(".icon-user-unfollow").click();
		cy.login(perfil.user, perfil.pass);
		cy.get(".woocommerce-MyAccount-content > :nth-child(2)").should(
			"contain",
			"Olá, dani.teste"
		);

		//Clicar no menu para ir para a página de Produtos
		cy.get("#primary-menu > .menu-item-629 > a").click();

		//Escolher 4 produtos diferentes
		cy.fixture("produtos").then((dados) => {
			dados.forEach((dado) => {
				produtosSelect.buscarProduto(dado.nomeProduto);
				produtosSelect.addProdutoCarrinho(
					dado.tamanho,
					dado.cor,
					dado.quantidade
				);
			});
		});

		//Clicar no carrinho e verificar se está na página do Carrinho
		cy.get(".dropdown-toggle > .text-skin > .icon-basket").click();
		cy.get(
			"#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .view-cart"
		).click();
		cy.get(".page-title").should("contain", "Carrinho");

		//Ir para o Checkout e verificar se está na página do Checkout
		cy.get(".checkout-button").click();
		cy.get(".woocommerce-billing-fields > h3").should(
			"contain",
			"Detalhes de faturamento"
		);

		//Preencher os detalhes do faturamento
		cy.checkout();

		//Validar minhas compras
		cy.wait(5000);
		cy.get(".woocommerce-notice").should(
			"contain",
			"Obrigado. Seu pedido foi recebido."
		);
		cy.get("address").should("contain", "Daniella Maleski");
	});
});
