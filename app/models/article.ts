export class Article {
articleName: string;
articleDescription: string;
price: number;
amount: number;

    constructor(
        public articleID: string,
        public articleNumber: string,
        public unit: string,
        public increment: number,
        public defaultAmount: number,
        public customerArticleNumber?: string
    ) { }
}