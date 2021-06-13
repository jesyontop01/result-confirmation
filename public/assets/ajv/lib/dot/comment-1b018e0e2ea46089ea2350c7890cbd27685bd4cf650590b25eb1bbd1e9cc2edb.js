(function() { this.JST || (this.JST = {}); this.JST["ajv/lib/dot/comment"] = {{# def.definitions }}
  {{# def.setupKeyword }}
  
  {{ var $comment = it.util.toQuotedString($schema); }}
  {{? it.opts.$comment === true }}
    console.log({{=$comment}});
  {{?? typeof it.opts.$comment == 'function' }}
    self._opts.$comment({{=$comment}}, {{=it.util.toQuotedString($errSchemaPath)}}, validate.root.schema);
  {{?}};
}).call(this);
