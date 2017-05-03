(function(ADL){

  if (typeof module !== 'undefined') {
    var Statement = function(){};
    // var Statement = require('./Statement');
  }

  /*
   * Describes an object that an agent interacts with
   * @param {string} id   The unique activity IRI
   * @param {string} name   An English-language identifier for the activity, or a Language Map
   * @param {string} description   An English-language description of the activity, or a Language Map
   */
  var Activity = function(id, name, description)
  {
    // if first arg is activity, copy everything over
    if(id && id.id){
      var act = id;
      for(var i in act){
        this[i] = act[i];
      }
      return;
    }

    this.objectType = 'Activity';
    this.id = id;
    if( name || description )
    {
      this.definition = {};

      if( typeof(name) === 'string' || name instanceof String )
        this.definition.name = {'en-US': name};
      else if(name)
        this.definition.name = name;

      if( typeof(description) === 'string' || description instanceof String )
        this.definition.description = {'en-US': description};
      else if(description)
        this.definition.description = description;
    }
  };
  Activity.prototype.toString = function(){
    if(this.definition && this.definition.name && (this.definition.name['en-US'] || this.definition.name['en']))
      return this.definition.name['en-US'] || this.definition.name['en'];
    else
      return this.id;
  };
  Activity.prototype.isValid = function(){
    return this.id && (!this.objectType || this.objectType === 'Activity');
  };

  /*
   * An object that refers to a separate statement
   * @param {string} id   The UUID of another statement
   */
  var StatementRef = function(id){
    if(id && id.id){
      for(var i in id){
        this[i] = id[i];
      }
    }
    else {
      this.objectType = 'StatementRef';
      this.id = id;
    }
  };
  StatementRef.prototype.toString = function(){
    return 'statement('+this.id+')';
  };
  StatementRef.prototype.isValid = function(){
    return this.id && this.objectType && this.objectType === 'StatementRef';
  };

  /*
   * A self-contained statement as the object of another statement
   * See Statement for constructor details
   * @param {string} actor   The Agent or Group committing the action described by the statement
   * @param {string} verb   The Verb for the action described by the statement
   * @param {string} object   The receiver of the action. An Agent, Group, Activity, or StatementRef
   */
  var SubStatement = function(actor, verb, object){
    Statement.call(this,actor,verb,object);
    this.objectType = 'SubStatement';

    delete this.id;
    delete this.stored;
    delete this.version;
    delete this.authority;
  };
  SubStatement.prototype = new Statement;
  SubStatement.prototype.toString = function(){
    return '"' + SubStatement.prototype.prototype.toString.call(this) + '"';
  };


  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
      Activity: Activity,
      StatementRef: StatementRef,
      SubStatement: SubStatement
    };
  }

})(typeof module !== 'undefined' ? this : window.ADL = window.ADL || {});
