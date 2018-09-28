<a name="module_AccountRescue"></a>

## AccountRescue

* [AccountRescue](#module_AccountRescue)
    * [~renderRescue(options, [macros])](#module_AccountRescue..renderRescue) ⇒ <code>Promise.&lt;AccountRescueInfo&gt;</code>
    * [~RenderRescueOptions](#module_AccountRescue..RenderRescueOptions) : <code>Object</code>
    * [~RenderRescueTemplateProperties](#module_AccountRescue..RenderRescueTemplateProperties) : <code>Object</code>
    * [~AccountRescueInfo](#module_AccountRescue..AccountRescueInfo) : <code>Object</code>

<a name="module_AccountRescue..renderRescue"></a>

### AccountRescue~renderRescue(options, [macros]) ⇒ <code>Promise.&lt;AccountRescueInfo&gt;</code>
Render a rescue document

**Kind**: inner method of [<code>AccountRescue</code>](#module_AccountRescue)  
**Returns**: <code>Promise.&lt;AccountRescueInfo&gt;</code> - Account rescue data  

| Param | Type |
| --- | --- |
| options | <code>RenderRescueOptions</code> | 
| [macros] | <code>RenderRescueTemplateProperties</code> | 

<a name="module_AccountRescue..RenderRescueOptions"></a>

### AccountRescue~RenderRescueOptions : <code>Object</code>
**Kind**: inner typedef of [<code>AccountRescue</code>](#module_AccountRescue)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| accountIdentifier | <code>String</code> | The account identification value (ID,  username etc.) |
| accountSecret | <code>String</code> | The secret value to encrypt, which will  be made available when consuming the rescue information |
| output | <code>String</code> | Type of output - either "html" (string) or  "pdf" (buffer) |

<a name="module_AccountRescue..RenderRescueTemplateProperties"></a>

### AccountRescue~RenderRescueTemplateProperties : <code>Object</code>
**Kind**: inner typedef of [<code>AccountRescue</code>](#module_AccountRescue)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| system | <code>String</code> | The name of the system |

<a name="module_AccountRescue..AccountRescueInfo"></a>

### AccountRescue~AccountRescueInfo : <code>Object</code>
**Kind**: inner typedef of [<code>AccountRescue</code>](#module_AccountRescue)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>String</code> \| <code>Buffer</code> | Resulting data (PDF/HTML) |
| remote | <code>String</code> | Remote secret |

