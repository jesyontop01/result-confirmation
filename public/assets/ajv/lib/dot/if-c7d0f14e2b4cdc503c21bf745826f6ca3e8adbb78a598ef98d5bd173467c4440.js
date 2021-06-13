(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/if"] = {{# def.definitions }}
  {{# def.errors }}
  {{# def.setupKeyword }}
  {{# def.setupNextLevel }}
  
  
  {{## def.validateIfClause:_clause:
    {{
      $it.schema = it.schema['_clause'];
      $it.schemaPath = it.schemaPath + '._clause';
      $it.errSchemaPath = it.errSchemaPath + '/_clause';
    }}
    {{# def.insertSubschemaCode }}
    {{=$valid}} = {{=$nextValid}};
    {{? $thenPresent && $elsePresent }}
      {{ $ifClause = 'ifClause' + $lvl; }}
      var {{=$ifClause}} = '_clause';
    {{??}}
      {{ $ifClause = '\'_clause\''; }}
    {{?}}
  #}}
  
  {{
    var $thenSch = it.schema['then']
      , $elseSch = it.schema['else']
      , $thenPresent = $thenSch !== undefined && {{# def.nonEmptySchema:$thenSch }}
      , $elsePresent = $elseSch !== undefined && {{# def.nonEmptySchema:$elseSch }}
      , $currentBaseId = $it.baseId;
  }}
  
  {{? $thenPresent || $elsePresent }}
    {{
      var $ifClause;
      $it.createErrors = false;
      $it.schema = $schema;
      $it.schemaPath = $schemaPath;
      $it.errSchemaPath = $errSchemaPath;
    }}
    var {{=$errs}} = errors;
    var {{=$valid}} = true;
  
    {{# def.setCompositeRule }}
    {{# def.insertSubschemaCode }}
    {{ $it.createErrors = true; }}
    {{# def.resetErrors }}
    {{# def.resetCompositeRule }}
  
    {{? $thenPresent }}
      if ({{=$nextValid}}) {
        {{# def.validateIfClause:then }}
      }
      {{? $elsePresent }}
        else {
      {{?}}
    {{??}}
      if (!{{=$nextValid}}) {
    {{?}}
  
    {{? $elsePresent }}
        {{# def.validateIfClause:else }}
      }
    {{?}}
  
    if (!{{=$valid}}) {
      {{# def.extraError:'if' }}
    } 
    {{? $breakOnError }} else { {{?}}
  
    {{# def.cleanUp }}
  {{??}}
    {{? $breakOnError }}
      if (true) {
    {{?}}
  {{?}};
}).call(this);
