/*! jQuery Validation Plugin - v1.19.1 - 6/15/2019
 * https://jqueryvalidation.org/
 * Copyright (c) 2019 Jörn Zaefferer; Licensed MIT */

!function(a){"function"==typeof define&&define.amd?define(["jquery","../jquery.validate.min"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){return a.extend(a.validator.messages,{required:"Campo de preenchimento obrigat&oacute;rio.",remote:"Por favor, corrija este campo.",email:"Por favor, introduza um endere&ccedil;o eletr&oacute;nico v&aacute;lido.",url:"Por favor, introduza um URL v&aacute;lido.",date:"Por favor, introduza uma data v&aacute;lida.",dateISO:"Por favor, introduza uma data v&aacute;lida (ISO).",number:"Por favor, introduza um n&uacute;mero v&aacute;lido.",digits:"Por favor, introduza apenas d&iacute;gitos.",creditcard:"Por favor, introduza um n&uacute;mero de cart&atilde;o de cr&eacute;dito v&aacute;lido.",equalTo:"Por favor, introduza de novo o mesmo valor.",extension:"Por favor, introduza um ficheiro com uma extens&atilde;o v&aacute;lida.",maxlength:a.validator.format("Por favor, n&atilde;o introduza mais do que {0} caracteres."),minlength:a.validator.format("Por favor, introduza pelo menos {0} caracteres."),rangelength:a.validator.format("Por favor, introduza entre {0} e {1} caracteres."),range:a.validator.format("Por favor, introduza um valor entre {0} e {1}."),max:a.validator.format("Por favor, introduza um valor menor ou igual a {0}."),min:a.validator.format("Por favor, introduza um valor maior ou igual a {0}."),nifES:"Por favor, introduza um NIF v&aacute;lido.",nieES:"Por favor, introduza um NIE v&aacute;lido.",cifES:"Por favor, introduza um CIF v&aacute;lido."}),a});
