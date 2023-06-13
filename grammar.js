function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(keyword) {
  keyword = escapeRegex(keyword);
  return new RegExp("([ ]+" + keyword.toLowerCase() + ")|(" + keyword.toUpperCase() + ")[ ]+");
};
module.exports = grammar({
  name: 'forth',

  extras: $ => [
    /\s/
  ],

  conflicts: $ => [
    [$.builtin],
    [$.word_definition],
  ],

  rules: {
    source_file: $ => repeat($._definition),

    _definition: $ => choice(
      $.word_definition,
      $.string,
      $.number,
      choice($.builtin, $.word),
      $.comment
    ),

    comment: $ => choice(
      /\\.*\n/,
      /\(.*\)/,
    ),

    string: $ => /s"[ ]+.*"/,

    word_definition: $ => prec(5, seq(
      $.start_definition,
      $.word,
      prec(4, optional($.stack_effects)),
      repeat1(choice($.number, choice($.builtin, $.word), $.comment)),
      $.end_definition
    )),
    number: $ => prec(4, /('\w')|(0[xX][0-9a-fA-F]+)|(\$[0-9a-fA-F]+)|(%[01]+)|(&\d+)|\d+/),

    builtin: $ => prec(5, choice(
      $.core,
      $.operator,
    )),
    core: $ => choice(
      caseInsensitive("include"),
      caseInsensitive("!"),
      caseInsensitive("#"),
      caseInsensitive("#>"),
      caseInsensitive("#S"),
      caseInsensitive("'"),
      caseInsensitive("*/MOD"),
      caseInsensitive("+!"),
      caseInsensitive("+LOOP"),
      caseInsensitive(","),
      caseInsensitive("."),
      caseInsensitive(".\""),
      caseInsensitive("/MOD"),
      caseInsensitive("0<"),
      caseInsensitive("0="),
      caseInsensitive("1+"),
      caseInsensitive("1-"),
      caseInsensitive("2!"),
      caseInsensitive("2*"),
      caseInsensitive("2/"),
      caseInsensitive("2@"),
      caseInsensitive("2DROP"),
      caseInsensitive("2DUP"),
      caseInsensitive("2OVER"),
      caseInsensitive("2SWAP"),
      caseInsensitive("<#"),
      caseInsensitive(">BODY"),
      caseInsensitive(">IN"),
      caseInsensitive(">NUMBER"),
      caseInsensitive(">R"),
      caseInsensitive("?DUP"),
      caseInsensitive("@"),
      caseInsensitive("ABORT"),
      caseInsensitive("ABORT\""),
      caseInsensitive("ABS"),
      caseInsensitive("ACCEPT"),
      caseInsensitive("ALIGN"),
      caseInsensitive("ALIGNED"),
      caseInsensitive("ALLOT"),
      caseInsensitive("AND"),
      caseInsensitive("BASE"),
      caseInsensitive("BEGIN"),
      caseInsensitive("BL"),
      caseInsensitive("C!"),
      caseInsensitive("C,"),
      caseInsensitive("C@"),
      caseInsensitive("CELL+"),
      caseInsensitive("CELLS"),
      caseInsensitive("CHAR"),
      caseInsensitive("CHAR+"),
      caseInsensitive("CHARS"),
      caseInsensitive("CONSTANT"),
      caseInsensitive("COUNT"),
      caseInsensitive("CR"),
      caseInsensitive("CREATE"),
      caseInsensitive("DECIMAL"),
      caseInsensitive("DEPTH"),
      caseInsensitive("DO"),
      caseInsensitive("DOES>"),
      caseInsensitive("DROP"),
      caseInsensitive("DUP"),
      caseInsensitive("ELSE"),
      caseInsensitive("EMIT"),
      caseInsensitive("ENVIRONMENT?"),
      caseInsensitive("EVALUATE"),
      caseInsensitive("EXECUTE"),
      caseInsensitive("EXIT"),
      caseInsensitive("FILL"),
      caseInsensitive("FIND"),
      caseInsensitive("FM/MOD"),
      caseInsensitive("HERE"),
      caseInsensitive("HOLD"),
      caseInsensitive("I"),
      caseInsensitive("IF"),
      caseInsensitive("IMMEDIATE"),
      caseInsensitive("INVERT"),
      caseInsensitive("J"),
      caseInsensitive("KEY"),
      caseInsensitive("LEAVE"),
      caseInsensitive("LITERAL"),
      caseInsensitive("LOOP"),
      caseInsensitive("LSHIFT"),
      caseInsensitive("M*"),
      caseInsensitive("MAX"),
      caseInsensitive("MIN"),
      caseInsensitive("MOD"),
      caseInsensitive("MOVE"),
      caseInsensitive("NEGATE"),
      caseInsensitive("OR"),
      caseInsensitive("OVER"),
      caseInsensitive("POSTPONE"),
      caseInsensitive("QUIT"),
      caseInsensitive("R>"),
      caseInsensitive("R@"),
      caseInsensitive("RECURSE"),
      caseInsensitive("REPEAT"),
      caseInsensitive("ROT"),
      caseInsensitive("RSHIFT"),
      caseInsensitive("S\""),
      caseInsensitive("S>D"),
      caseInsensitive("SIGN"),
      caseInsensitive("SM/REM"),
      caseInsensitive("SOURCE"),
      caseInsensitive("SPACE"),
      caseInsensitive("SPACES"),
      caseInsensitive("STATE"),
      caseInsensitive("SWAP"),
      caseInsensitive("THEN"),
      caseInsensitive("TYPE"),
      caseInsensitive("U."),
      caseInsensitive("U<"),
      caseInsensitive("UM*"),
      caseInsensitive("UM/MOD"),
      caseInsensitive("UNLOOP"),
      caseInsensitive("UNTIL"),
      caseInsensitive("VARIABLE"),
      caseInsensitive("WHILE"),
      caseInsensitive("WORD"),
      caseInsensitive("XOR"),
      caseInsensitive("["),
      caseInsensitive("[']"),
      caseInsensitive("[CHAR]"),
      caseInsensitive(".(\""),
      caseInsensitive(".R"),
      caseInsensitive(".S"),
      caseInsensitive("0<>"),
      caseInsensitive("0>"),
      caseInsensitive("2>R"),
      caseInsensitive("2R>"),
      caseInsensitive("2R@"),
      caseInsensitive(":NONAME"),
      caseInsensitive("<>"),
      caseInsensitive("?DO"),
      caseInsensitive("ACTION-OF"),
      caseInsensitive("AGAIN"),
      caseInsensitive("BUFFER:"),
      caseInsensitive("C\""),
      caseInsensitive("CASE"),
      caseInsensitive("COMPILE,"),
      caseInsensitive("DEFER"),
      caseInsensitive("DEFER!"),
      caseInsensitive("DEFER@"),
      caseInsensitive("ENDCASE"),
      caseInsensitive("ENDOF"),
      caseInsensitive("ERASE"),
      caseInsensitive("FALSE"),
      caseInsensitive("HEX"),
      caseInsensitive("HOLDS"),
      caseInsensitive("IS"),
      caseInsensitive("MARKER"),
      caseInsensitive("NIP"),
      caseInsensitive("OF"),
      caseInsensitive("PAD"),
      caseInsensitive("PARSE"),
      caseInsensitive("PARSE-NAME"),
      caseInsensitive("PICK"),
      caseInsensitive("REFILL"),
      caseInsensitive("RESTORE-INPUT"),
      caseInsensitive("ROLL"),
      caseInsensitive("S\\\""),
      caseInsensitive("SAVE-INPUT"),
      caseInsensitive("SOURCE-ID"),
      caseInsensitive("TO"),
      caseInsensitive("TRUE"),
      caseInsensitive("TUCK"),
      caseInsensitive("U.R"),
      caseInsensitive("U>"),
      caseInsensitive("UNUSED"),
      caseInsensitive("VALUE"),
      caseInsensitive("WITHIN"),
      caseInsensitive("[COMPILE]"),
      caseInsensitive("\"")
    ),
    operator: $ => choice(
      "=",
      "+",
      "-",
      "/",
      "*",
      "*/",
      ">",
      "<"
    ),
    word: $ => /\S+/,
    // word: $ => /[^():; ]+/,

    stack_effects: $ => prec(4, seq(
      $.lparen,
      repeat($.word),
      $.stack_effect_sep,
      repeat($.word),
      $.rparen
    )),
    lparen: $ => /\(/,
    rparen: $ => /\)/,
    stack_effect_sep: $ => prec(3, "--"),
    start_definition: $ => prec(3, ":"),
    end_definition: $ => prec(3, ";"),
  }
});