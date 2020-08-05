angular.module('verifier').factory('Receipt', function($resource) {
  return $resource('receipt_statuses.json/:id/:receiptNo', { id: '@id' },{ receiptNo: '@receiptNo' }, {
  	get:    {method: 'GET', isArray: false},
  	query: { method: 'GET', isArray: false },
    update: {
      method: 'PUT'
    }
  });
});