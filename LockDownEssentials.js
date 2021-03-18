const Order = require("./Order");

const OrderState = Object.freeze ({
    WELCOMING:  Symbol("welcoming"),
    CLEANERS:   Symbol("cleaners"),
    BULBS:      Symbol("bulbs"),
    EXTRAS:     Symbol("extras")
});

module.exports = class LockDownEssentials extends Order 
{
    constructor(sNumber, sUrl) 
    {
        super(sNumber, sUrl);
        this.stateCur = OrderState.WELCOMING;
        this.sCategories = "";
        this.sCleaners = "";
        this.sBulbs = "";
        this.sExtras = "";
        this.nTotal = 0;
    }

    handleInput(sInput) 
    {
        let aReturn = [];

        switch (this.stateCur)
        {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CLEANERS;

                aReturn.push("Welcome to Meomun's Home Hardware!");
                aReturn.push(`For a list of what we sell, please tap:`);
                aReturn.push(`${this.sUrl}/payment/${this.sNumber}/`);

                if (sInput.toLowerCase() == "home") 
                {
                    this.sCategories = "home";
                }
                else if (sInput.toLowerCase() == "car") 
                {
                    this.sCategories = "car";
                }
                else 
                {
                    this.stateCur = OrderState.WELCOMING;
                    aReturn.push("Please type HOME or CAR if you want to buy maintenance essentials for either of them!");
                    break;
                }

                aReturn.push("Would you like LIQUID or POWDER cleaners or NO?");
                break;

            case OrderState.CLEANERS:
                if (this.sCategories == "home")
                {
                    this.stateCur = OrderState.BULBS;
                    aReturn.push("Would you like a pack of 4 light-bulbs?");
                }
                else //"car"
                {
                    this.stateCur = OrderState.EXTRAS;
                    aReturn.push("Would you like simonize car cloths for your car?");
                }

                if (sInput.toLowerCase() != "no") {
                    this.sCleaners = sInput;
                }
                break;

            case OrderState.BULBS:
                this.stateCur = OrderState.EXTRAS

                if (sInput.toLowerCase() != "no")
                {
                    this.sBulbs = "a pack of 4 light-bulbs";
                }

                aReturn.push("Would you like a mug for your kitchen?");
                break;

            case OrderState.EXTRAS:
                this.isDone(true);

                if (sInput.toLowerCase() != "no")
                {
                    if (this.sCategories == "home")
                    {
                        this.sExtras = "a mug";
                    }
                    else //"car"
                    {
                        this.sExtras = "simonize car cloths";
                    }
                }

                console.log(`sCategories ${this.sCategories}, sCleaners ${this.sCleaners}, sBulbs ${this.sBulbs}, sExtras ${this.sExtras}`);

                //Calculate order
                var orderTxt = "";

                if (this.sCategories == "home" && this.sCleaners.toLowerCase() == "liquid")
                {
                    orderTxt += "liquid household cleaners";
                    this.nTotal += 19.99;
                    console.log(`home, liquid - 19.99`);
                } 
                else if (this.sCategories == "home" && this.sCleaners.toLowerCase() == "powder") 
                {
                    orderTxt += "powder household cleaners";
                    this.nTotal += 19.99;
                    console.log(`home, powder - 19.99`);
                } 
                else if (this.sCategories == "car" && this.sCleaners.toLowerCase() == "liquid") 
                {
                    orderTxt += "liquid car cleaners";
                    this.nTotal += 9.99;
                    console.log(`car, liquid - 9.99`);
                } 
                else if (this.sCategories == "car" && this.sCleaners.toLowerCase() == "powder") 
                {
                    orderTxt += "powder car cleaners";
                    this.nTotal += 9.99;
                    console.log(`car, powder - 9.99`);
                }

                if (this.sBulbs) 
                {
                    orderTxt += `, ${this.sBulbs}`;
                    this.nTotal += 6.99;
                    console.log(`bulbs - 6.99`);
                }

                if (this.sExtras)
                {
                    orderTxt += `, ${this.sExtras}`;
                    this.nTotal += 4.99;
                    console.log(`extras - 4.99`);
                }

                //Add tax 13%
                this.nTotal = this.nTotal * 1.13;

                aReturn.push(`Thank-you for your order of ${orderTxt.toString()}.`);
                aReturn.push(`Your total with tax comes to $${this.nTotal.toFixed(2)}.`);
                aReturn.push(`We will text you from 519-222-2222 when your order is ready or if we have questions.`);

                break;
        }

        return aReturn;
    }

    renderForm() 
    {
        // your client id should be kept private
        return (`
        <html>

        <head>
            <meta content="text/html; charset=UTF-8" http-equiv="content-type">
            <style type="text/css">
                ol {
                    margin: 0;
                    padding: 0
                }

                table td,
                table th {
                    padding: 0
                }

                .c2 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 90pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }

                .c3 {
                    border-right-style: solid;
                    padding: 5pt 5pt 5pt 5pt;
                    border-bottom-color: #000000;
                    border-top-width: 1pt;
                    border-right-width: 1pt;
                    border-left-color: #000000;
                    vertical-align: top;
                    border-right-color: #000000;
                    border-left-width: 1pt;
                    border-top-style: solid;
                    border-left-style: solid;
                    border-bottom-width: 1pt;
                    width: 162.8pt;
                    border-top-color: #000000;
                    border-bottom-style: solid
                }

                .c1 {
                    color: #000000;
                    font-weight: 400;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 11pt;
                    font-family: "Arial";
                    font-style: normal
                }

                .c10 {
                    color: #000000;
                    font-weight: 700;
                    text-decoration: none;
                    vertical-align: baseline;
                    font-size: 15pt;
                    font-family: "Arial";
                    font-style: normal
                }

                .c5 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.15;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                .c8 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: left
                }

                .c9 {
                    padding-top: 0pt;
                    padding-bottom: 0pt;
                    line-height: 1.0;
                    text-align: right
                }

                .c7 {
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin-right: auto
                }

                .c4 {
                    background-color: #ffffff;
                    max-width: 468pt;
                    padding: 72pt 72pt 72pt 72pt
                }

                .c0 {
                    height: 0pt
                }

                .c6 {
                    height: 11pt
                }

                .title {
                    padding-top: 0pt;
                    color: #000000;
                    font-size: 26pt;
                    padding-bottom: 3pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                .subtitle {
                    padding-top: 0pt;
                    color: #666666;
                    font-size: 15pt;
                    padding-bottom: 16pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                li {
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }

                p {
                    margin: 0;
                    color: #000000;
                    font-size: 11pt;
                    font-family: "Arial"
                }

                h1 {
                    padding-top: 20pt;
                    color: #000000;
                    font-size: 20pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                h2 {
                    padding-top: 18pt;
                    color: #000000;
                    font-size: 16pt;
                    padding-bottom: 6pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                h3 {
                    padding-top: 16pt;
                    color: #434343;
                    font-size: 14pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                h4 {
                    padding-top: 14pt;
                    color: #666666;
                    font-size: 12pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                h5 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }

                h6 {
                    padding-top: 12pt;
                    color: #666666;
                    font-size: 11pt;
                    padding-bottom: 4pt;
                    font-family: "Arial";
                    line-height: 1.15;
                    page-break-after: avoid;
                    font-style: italic;
                    orphans: 2;
                    widows: 2;
                    text-align: left
                }
            </style>
        </head>

        <body class="c4">
            <p class="c5"><span class="c1">For curbside pickup:</span></p>
            <p class="c5"><span>Text &ldquo;HOME&rdquo; or &ldquo;CAR&rdquo; to </span><span class="c10">519-111-1111</span></p>
            <p class="c5 c6"><span class="c1"></span></p>
            <p class="c5 c6"><span class="c1"></span></p><a id="t.57a7ecdbaa0c6f763ab48f9012ebd574fadc557a"></a><a id="t.0"></a>
            <table class="c7">
                <tbody>
                    <tr class="c0">
                        <td class="c3" colspan="1" rowspan="1">
                            <p class="c8"><span class="c1">Household cleaners</span></p>
                        </td>
                        <td class="c2" colspan="1" rowspan="1">
                            <p class="c9"><span class="c1">$19.99</span></p>
                        </td>
                    </tr>
                    <tr class="c0">
                        <td class="c3" colspan="1" rowspan="1">
                            <p class="c8"><span class="c1">Car cleaners</span></p>
                        </td>
                        <td class="c2" colspan="1" rowspan="1">
                            <p class="c9"><span class="c1">$9.99</span></p>
                        </td>
                    </tr>
                    <tr class="c0">
                        <td class="c3" colspan="1" rowspan="1">
                            <p class="c8"><span class="c1">A pack of 4 light-bulbs</span></p>
                        </td>
                        <td class="c2" colspan="1" rowspan="1">
                            <p class="c9"><span class="c1">$6.99</span></p>
                        </td>
                    </tr>
                    <tr class="c0">
                        <td class="c3" colspan="1" rowspan="1">
                            <p class="c8"><span class="c1">Simonize car cloths</span></p>
                        </td>
                        <td class="c2" colspan="1" rowspan="1">
                            <p class="c9"><span class="c1">$4.99</span></p>
                        </td>
                    </tr>
                    <tr class="c0">
                        <td class="c3" colspan="1" rowspan="1">
                            <p class="c8"><span class="c1">Mug</span></p>
                        </td>
                        <td class="c2" colspan="1" rowspan="1">
                            <p class="c9"><span class="c1">$4.99</span></p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <p class="c5 c6"><span class="c1"></span></p>
            <p class="c5"><span class="c1">We also have a selection of other maintenance essentials.</span></p>
        </body>

        </html>
        `);
    }
}
