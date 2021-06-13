(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/custom"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.setupKeyword }}
  {{# def.$data }}
  
  {{
    var $rule = this
      , $definition = 'definition' + $lvl
      , $rDef = $rule.definition
      , $closingBraces = '';
    var $validate = $rDef.validate;
    var $compile, $inline, $macro, $ruleValidate, $validateCode;
  }}
  
  {{? $isData && $rDef.$data }}
    {{
      $validateCode = 'keywordValidate' + $lvl;
      var $validateSchema = $rDef.validateSchema;
    }}
    var {{=$definition}} = RULES.custom['{{=$keyword}}'].definition;
    var {{=$validateCode}} = {{=$definition}}.validate;
  {{??}}
    {{
      $ruleValidate = it.useCustomRule($rule, $schema, it.schema, it);
      if (!$ruleValidate) return;
      $schemaValue = 'validate.schema' + $schemaPath;
      $validateCode = $ruleValidate.code;
      $compile = $rDef.compile;
      $inline = $rDef.inline;
      $macro = $rDef.macro;
    }}
  {{?}}
  
  {{
    var $ruleErrs = $validateCode + '.errors'
      , $i = 'i' + $lvl
      , $ruleErr = 'ruleErr' + $lvl
      , $asyncKeyword = $rDef.async;
  
    if ($asyncKeyword && !it.async)
      throw new Error('async keyword in sync schema');
  }}
  
  
  {{? !($inline || $macro) }}{{=$ruleErrs}} = null;{{?}}
  var {{=$errs}} = errors;
  var {{=$valid}};
  
  {{## def.callRuleValidate:
    {{=$validateCode}}.call(
      {{? it.opts.passContext }}this{{??}}self{{?}}
      {{? $compile || $rDef.schema === false }}
        , {{=$data}}
      {{??}}
        , {{=$schemaValue}}
        , {{=$data}}
        , validate.schema{{=it.schemaPath}}
      {{?}}
      , {{# def.dataPath }}
      {{# def.passParentData }}
      , rootData
    )
  #}}
  
  {{## def.extendErrors:_inline:
    for (var {{=$i}}={{=$errs}}; {{=$i}}<errors; {{=$i}}++) {
      var {{=$ruleErr}} = vErrors[{{=$i}}];
      if ({{=$ruleErr}}.dataPath === undefined)
        {{=$ruleErr}}.dataPath = (dataPath || '') + {{= it.errorPath }};
      {{# _inline ? 'if (\{\{=$ruleErr\}\}.schemaPath === undefined) {' : '' }}
        {{=$ruleErr}}.schemaPath = "{{=$errSchemaPath}}";
      {{# _inline ? '}' : '' }}
      {{? it.opts.verbose }}
        {{=$ruleErr}}.schema = {{=$schemaValue}};
        {{=$ruleErr}}.data = {{=$data}};
      {{?}}
    }
  #}}
  
  
  {{? $isData && $rDef.$data }}
    {{ $closingBraces += '}'; }}
    if ({{=$schemaValue}} === undefined) {
      {{=$valid}} = true;
    } else {
    {{? $validateSchema }}
      {{ $closingBraces += '}'; }}
      {{=$valid}} = {{=$definition}}.validateSchema({{=$schemaValue}});
      if ({{=$valid}}) {
    {{?}}
  {{?}}
  
  {{? $inline }}
    {{? $rDef.statements }}
      {{= $ruleValidate.validate }}
    {{??}}
      {{=$valid}} = {{= $ruleValidate.validate }};
    {{?}}
  {{?? $macro }}
    {{# def.setupNextLevel }}
    {{
      $it.schema = $ruleValidate.validate;
      $it.schemaPath = '';
    }}
    {{# def.setCompositeRule }}
    {{ var $code = it.validate($it).replace(/validate\.schema/g, $validateCode); }}
    {{# def.resetCompositeRule }}
    {{= $code }}
  {{??}}
    {{# def.beginDefOut}}
      {{# def.callRuleValidate }}
    {{# def.storeDefOut:def_callRuleValidate }}
  
    {{? $rDef.errors === false }}
      {{=$valid}} = {{? $asyncKeyword }}await {{?}}{{= def_callRuleValidate }};
    {{??}}
      {{? $asyncKeyword }}
        {{ $ruleErrs = 'customErrors' + $lvl; }}
        var {{=$ruleErrs}} = null;
        try {
          {{=$valid}} = await {{= def_callRuleValidate }};
        } catch (e) {
          {{=$valid}} = false;
          if (e instanceof ValidationError) {{=$ruleErrs}} = e.errors;
          else throw e;
        }
      {{??}}
        {{=$ruleErrs}} = null;
        {{=$valid}} = {{= def_callRuleValidate }};
      {{?}}
    {{?}}
  {{?}}
  
  {{? $rDef.modifying }}
    if ({{=$parentData}}) {{=$data}} = {{=$parentData}}[{{=$parentDataProperty}}];
  {{?}}
  
  {{= $closingBraces }}
  
  {{## def.notValidationResult:
    {{? $rDef.valid === undefined }}
      !{{? $macro }}{{=$nextValid}}{{??}}{{=$valid}}{{?}}
    {{??}}
      {{= !$rDef.valid }}
    {{?}}
  #}}
  
  {{? $rDef.valid }}
    {{? $breakOnError }} if (true) { {{?}}
  {{??}}
    if ({{# def.notValidationResult }}) {
      {{ $errorKeyword = $rule.keyword; }}
      {{# def.beginDefOut}}
        {{# def.error:'custom' }}
      {{# def.storeDefOut:def_customError }}
  
      {{? $inline }}
        {{? $rDef.errors }}
          {{? $rDef.errors != 'full' }}
            {{# def.extendErrors:true }}
          {{?}}
        {{??}}
          {{? $rDef.errors === false}}
            {{= def_customError }}
          {{??}}
            if ({{=$errs}} == errors) {
              {{= def_customError }}
            } else {
              {{# def.extendErrors:true }}
            }
          {{?}}
        {{?}}
      {{?? $macro }}
        {{# def.extraError:'custom' }}
      {{??}}
        {{? $rDef.errors === false}}
          {{= def_customError }}
        {{??}}
          if (Array.isArray({{=$ruleErrs}})) {
            if (vErrors === null) vErrors = {{=$ruleErrs}};
            else vErrors = vErrors.concat({{=$ruleErrs}});
            errors = vErrors.length;
            {{# def.extendErrors:false }}
          } else {
            {{= def_customError }}
          }
        {{?}}
      {{?}}
  
    } {{? $breakOnError }} else { {{?}}
  {{?}};
}).call(this);
